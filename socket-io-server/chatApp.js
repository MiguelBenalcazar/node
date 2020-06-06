var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //creates a new socket.io instance attached to the http server.

app.get('/', function(req, res) {
   res.sendfile('chatApp.html');
});

users = [];
io.on('connection', function(socket){
   console.log("A user connected");
   socket.on('setUsername', function(data){
      if(users.indexOf(data) > -1){
         users.push(data);
         socket.emit("userSet", {username: data});
      }else{
         socket.emit("userExist", data + " username is taken! Try some other username.")
      }
   });

   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   });
});

http.listen(8000, function() {
   console.log('listening on *:8000');
});