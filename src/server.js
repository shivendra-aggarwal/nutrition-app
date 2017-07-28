
var http = require("http");
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res) { 
	res.sendFile(__dirname + "/app/analyze.html");
});

var server = http.createServer(app);

server.listen(2000, function(){
	console.log("Nutrition app live at port 2000");
});