var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //creates a new socket.io instance attached to the http server.

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var clients = 0; //variable to know the number of clients connected
//Whenever someone connects this gets executed
io.on('connection', function(socket){
   console.log('A user connected');

   //Whenever someone disconnects this piece of code executed
   // socket.on('disconnect', function(){
   //    console.log('A user disconnected');
   // });

   //send data
   setTimeout(function(){
      socket.send("message sent")
   }, 4000);

   //send object
   setTimeout(function(){
      socket.emit('testerEvent',{a : "Ecuador"});
   },8000);

   //receive info from client
   socket.on('clientEvent', function(data){
      console.log(data);
   })

   //BROADCASTING
   //Broadcasting means sending a message to all connected clients
   clients++;
   io.sockets.emit('broadcast', {b: clients + 'clients connected'});
   // socket.on('disconnect', function(){
   //    clients--;
   //    io.sockets.emit('broadcast', {b:clients + "clients connected"})
   // });
   
   // So in your app.js file, on connection of client send him 
   //a welcome message and broadcast connected client number to all others.
   socket.emit('newclientconnect',{obj: "Welcome" + clients});
   socket.broadcast.emit('newclientconnect',{obj:clients + 'clients connected'});
   socket.on('disconnect', function(){
         clients--;
         socket.broadcast.emit("newclientconnect",{obj:clients + 'clients connected'})
   });

});

 


http.listen(8000, function() {
   console.log('listening on *:8000');
});