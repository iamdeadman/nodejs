// program to create a writable stream which can send request data to the write stream object
var http = require('http');
var fs = require('fs');

http.createServer(function(request,response){
	var writeStream = fs.createWriteStream("writableStream.txt");
	request.pipe(writeStream);
	request.on('end',function(){
		response.writeHead(200);
		response.write("uploaded \n");
		response.end();
	});	
}).listen(8080);

