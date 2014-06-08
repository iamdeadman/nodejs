// program to use twitter api from node request
// use: curl -s url  - returns json 
// to get a nicer look use curl -s url | prettyjson
// install pretty print by npm install prettyjson -g
// ssl required so, not able to test this yet
var request = require('request');
var express = require('express');
var app = express();
var url = require('url');
app.get('/tweets/:username',function(req,response){
	var username = req.params.username;
	var options = {
		protocol: "http:",
		host: 'api.twitter.com',
		pathname: '/1/statuses/user_timeline.json',
		query: { screem_name: username, count: 10 }
	} 
	var twitterUrl = url.format(options);
	request(twitterUrl).pipe(response);
	console.log(twitterUrl);
});
app.listen(8080);

