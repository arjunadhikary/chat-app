const express = require('express');
const http =require('http')
const app = express();
const port = process.env.PORT || 3000
const path = require('path');
const server = http.createServer(app)
const dir = path.join(__dirname,'../public')
const socketio=require('socket.io')
const io = socketio(server);
const fwords=require('bad-words')
app.use(express.static(dir))
io.on('connection',(socket)=>{
    socket.emit('message',"Welcome my Friend!!")
    socket.broadcast.emit('message',"A new User Came into Chat")
    socket.on('sendMsg',(msg,callback)=>{
        io.emit('message',msg)
        const filter = new fwords()
        if(filter.isProfane(msg)){
            return callback('Don\'t use that word')
        }
        callback()
    })
    socket.on('disconnect',()=>{
       io.emit('message',"Users Has Left")
    })
    socket.on('location',(location,callback)=>{
        io.emit('message',`https://www.google.com/maps/@${location.latitude},${location.longitude}`)
        callback(' Server got it');
    })
    
    
})

server.listen(port,()=>{
    console.log('APP RUNNING ON PORT: '+port)
})