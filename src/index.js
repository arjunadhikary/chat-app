const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { getMsg, getUrl } = require('./lib/lib');
const { storeUsers, removeUser, findBy, findall } = require('./lib/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.on('join', (data, callback) => {
        const { user, error } = storeUsers({ id: socket.id, ...data })
        if (error) {
            return callback(error);
        }
        

        socket.join(user.room)
        socket.emit('message', getMsg(`Welcome ${user.username}`))
        socket.broadcast.to(user.room).emit('message', getMsg(`${user.username} has joined!`));
        io.to(user.room).emit('activeStats',{
            room:user.room,
            users:findall(user.room)
        })
        callback()

    })

    socket.on('sendMessage', (message, callback) => {
        const msgUser = findBy(socket.id)
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Don\'t use that word!')
        }

        io.to(msgUser.room).emit('message', getMsg(msgUser.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = findBy(socket.id)
        io.to(user.room).emit('locationMessage', getUrl(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const removed = removeUser(socket.id);
        if (removed) {
            io.to(removed.room).emit('message', getMsg(`${removed.username} has left`));
            io.to(removed.room).emit('activeStats', {
                room:removed.room,
                users:findall(removed.room)
               

            })
        }
      

    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})