var http = require('http');

http.createServer(function(request,response){
	response.writeHead(200);
	console.log("One");
	response.write("Hello \n");
	setTimeout(function(){
		console.log("three");
		response.write("Hello2 \n");
		response.end();
	},5000);
	console.log("Two");
	response.write("Hello3 \n");
}).listen(8080);
