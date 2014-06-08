var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser());
app.post('/shrib/:file/:data',function(req,res){
	var fileName = req.params.file;
	var data = req.params.data;
	req.on('data',function(data){ body+=data; } );
	req.on('end' ,function(){
		var postData = req.body;
		var writeStream = fs.createWriteStream(fileName);
		if(postData)
			console.log(postData);
		else{	
			console.log("failed miserably");
			console.log(postData);
		}
		res.writeHead(200);
		res.end();
	});
});
app.get('/shrib/:file',function(req,res){	
	var fileName = req.params.file;
	if(fileName != ''){
		var readStream = fs.createReadStream(fileName);
		var content;
		readStream.on('data',function(chunk){
			content+=chunk.toString();
			console.log(content);
		});
		readStream.on('end',function(){
			res.writeHead(200,{"Content-Type":"text/html"});
			res.write("<form id=\"submitForm\" method=\"POST\">");
			res.write("<textarea id=\"text\"rows=50 cols=50 >");
			console.log(content);
			if(content)
				res.write(content.toString());
			res.write("</textarea>");
			res.write("<input type=\"submit\" value=\"submit\" />");
			res.write("</form>");
			res.write("<script>");
			res.write("var windowLocation = location.href;");
			res.write("document.getElementById(\"submitForm\").action=windowLocation + \'/data\';");
			res.write("</script>");
			res.end();
		});
	}else{
		res.writeHead(200);
		res.write("invalid/empty path name"); 
	}
});
app.listen(8080);
