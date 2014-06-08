var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser());
app.post('/shrib/:file/data',function(req,res){
  var fileName = req.params.file;
  if (fileName !== '') {
    var postData = req.body.text;
    console.log('postData = ' + require('util').inspect(postData));
    fs.writeFile(fileName, postData, function(err) {
      if (err)
        return res.send(500);
      res.send(200);
    });
  } else
    res.send(400);
});
app.get('/shrib/:file',function(req,res){   
  var fileName = req.params.file;
  if (fileName !== '') {
    fs.readFile(fileName, { encoding: 'utf8' }, function(err, content) {
      if (err)
        return res.send(500);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write('<form id="submitForm" method="POST">');
      res.write('  <textarea name="text" id="text" rows="50" cols="50">');
      console.log(content);
      if (content)
        res.write(content); // TODO: escape content
      res.write('  </textarea>');
      res.write('  <input type="submit" value="submit" />');
      res.write('</form>');
      res.write('<script>');
      res.write('  var windowLocation = location.href;');
      res.write('  document.getElementById("submitForm").action = windowLocation + "/data";');
      res.write('</script>');
      res.end();
    });
  } else
    res.send(400, "invalid/empty path name"); 
});
app.listen(8080);
