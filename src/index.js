const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const path = require('path');
const container =path.join(__dirname,'../public') ;
const port = process.env.PORT || 4000;
app.get('/',(req,res)=>{
res.sendFile(container+'/index.html')
})
let count = 0
io.on('connection',(socket)=>{
    console.log('Connection Created')
socket.emit('countUpdate',count)
socket.on('clicked',()=>{
    count++
    io.emit('countUpdate',count)
})
socket.on('disconnect',()=>{
    console.log('Disconnected')
})

})

server.listen(port,()=>{
    console.log("Server Running on port "+port)
})