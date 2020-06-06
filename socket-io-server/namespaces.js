var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //creates a new socket.io instance attached to the http server.

app.get('/', function(req, res) {
   res.sendfile('namespaces.html');
});

//Namespace
// Socket.IO allows you to “namespace” your sockets, which essentially means assigning different endpoints or paths. This is a useful feature to minimize the number of resources (TCP connections) and at the same time separate concerns within your application by introducing separation between communication channels. Multiple namespaces actually share the same WebSockets connection thus saving us socket ports on the server.
var nsp = io.of('/myspace');
nsp.on('connection', function(socket){
   console.log("someone connected");
   nsp.emit("hi", 'Hello everyone')

});

 


http.listen(8000, function() {
   console.log('listening on *:8000');
});