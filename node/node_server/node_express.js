var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World, I\'m here!');
});

app.get('/goodbye', function (req, res) {
  res.send('goodbye World, I\'m leaving!');
});

app.get('/buckingham', function (req, res) {
  var responseText = "";

  responseText += "Did you know? My dog is <em>amazing!</em>";
  responseText += "<img src='https://scontent.cdninstagram.com/t51.2885-15/e35/13473152_1086412644729499_709233426_n.jpg?ig_cache_key=MTI4NjAyMTIwMzgyMzQyNDU3Nw%3D%3D.2' height='200'>";

  res.send(responseText);

  console.log('I just told them how awesome Buck is.');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});