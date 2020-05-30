const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const path = require('path');
const container =path.join(__dirname,'../public') ;
const port = process.env.PORT || 4000;
app.get('/',(req,res)=>{
res.sendFile(container+'/index.html')
})
let clients = 0;
io.on('connection', (socket)=>{
   clients++;
   io.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect',  ()=>{
      clients--;
      io.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});

server.listen(port,()=>{
    console.log("Server Running on port "+port)
})