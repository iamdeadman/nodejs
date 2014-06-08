var http = require('http');

http.createServer(function(request,response) {
	response.writeHead(200);
	response.write("Before TimeOut");
	setTimeout(function(){
		response.write("timeout event complete");
		response.end();
	},5000);
}).listen(8080);

console.log('Node is listening @ 8080');

