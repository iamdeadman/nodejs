// Program to extract url from the request and writing in that particular file
// To run use curl -d "data" url?fileName=""/&appendFlag=true
// Note: necessary to use /& in ubuntu terminal otherwise thinks & for creating background process or something like that
// also program is in the most basic version, so don't expect any error handling done here
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
http.createServer(function(request,response){
	var str = request.url.split('?')[1];
	var query = querystring.parse(str);
	appendOptions = { 
		'flags': 'a' ,
		'encoding' : null,
		'mode' : 0666
	}
	writeOptions = { 
		'flags': 'w' ,
		'encoding' : null,
		'mode' : 0666
	}
	var writeStream = null
	if(query["appendFlag"]=="true"){
		writeStream = fs.createWriteStream(query['fileName'],appendOptions);
	}else {
		writeStream = fs.createWriteStream(query['fileName'],writeOptions);
	}
	request.on('data',function(chunk){
		var buffer = writeStream.write(chunk.toString());
		if(!buffer) request.pause();
	});
	request.on('end',function(){
		response.writeHead(200);
		response.write("\n Content with this url is - \n");
		var readStream = fs.createReadStream(query['fileName'],{bufferSize:64*1024});
		readStream.on('data',function(chunk){
			response.write(chunk.toString());
		});	
		readStream.on('end',function(){
			response.write("\n");
			response.end();
		});
	});
	writeStream.on('drain',function(){
		request.resume();
	});

}).listen(8080);
