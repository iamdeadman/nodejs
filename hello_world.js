// Node first registers events.
// Then the node starts the event loop
// it checks for events continuously
// until some request comes, then it calls appropriate callbacks
// Javascript chosen for the node's language as javascript is essentially single threaded and thus supports our unblocking code efficiently
// so now, the event loop registers and looks for events, and then sends them back to event queue as soon as it encounters them

var http = require('http');

http.createServer(function(request,response){
	response.writeHead(200);
	response.write("Hello world from nodejs");
	response.end();
}).listen(8080);

console.log('node listening on 8080');
