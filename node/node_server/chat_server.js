var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

var messageArchive = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS,HEAD,GET,PUT");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/chat', function(req,res){
  res.sendFile('chat_client.html');
});

app.get('/get_chat_archive', function(req,res) {
  res.send(messageArchive);
});

app.get('/call_spotify', function(req,res){
	request("https://api.spotify.com/v1/search?q=prince&type=album", function(err, resp, body) {
		body = JSON.parse(body);
		res.send(body.albums.items[0].name);
	  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	

  	var msgWords = msg.text.split(" ");
  	var lastWord = msgWords[msgWords.length - 1];

  	request("https://api.spotify.com/v1/search?q=track:" + lastWord + "&type=track", function(err, resp, body) {
		body = JSON.parse(body);
		var randomTrackNumber = Math.floor(Math.random() * body.tracks.items.length);
		console.log( randomTrackNumber );
		var randomTrack = body.tracks.items[randomTrackNumber];
		msg.text = msg.text + " <a href='" + randomTrack.external_urls.spotify + "'>"+ randomTrack.name +"</a> by " + randomTrack.artists[0].name;
		io.emit("chat message", msg);
		messageArchive.push(msg);
	  });

    
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});