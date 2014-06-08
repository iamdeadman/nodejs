// the createServer used in hello_world.js is getting attached to the request event listener this way
// createServer() returns a server object and that server object has ability to listen to events of type 'request' 
// so we can creat callbacks for different request objects on server itself.

var http=require('http');

var server = http.createServer().listen(8080);
server.on('request',function(request,response){
	console.log("server emitted request event");
});

