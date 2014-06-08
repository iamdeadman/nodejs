// We can create our own objects for emitting certain events like errors, warnings, or info event.
// To create our event emitters, first import the module, call its constructor and then
// create listeners for any type of events you want, and then throw these events whenever you want
// This program creates a simple error event listener and throws the error event

var events = require('events');
var eventEmitter = new events.EventEmitter();
var http = require('http');
eventEmitter.on('error',function(message){
	console.log(message);	
});
http.createServer(function(request,response){
	response.writeHead(200);
	response.write("Body Test");
	response.write("Body Test2");
	response.end();
	eventEmitter.emit('error',"My First Error in Node.js");
	setTimeout(function(){
		eventEmitter.emit('error',"OOPS! but i did not throw this one, was to test events in node");

	},5000);
}).listen(8080);



