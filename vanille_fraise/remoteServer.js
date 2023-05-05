var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var count = 0;

app.get("/", function (req, res) {
  count++;
  res.sendFile(__dirname + "/index.html");
});

app.get("/jquery", function (req, res) {
  res.sendFile(__dirname + "/jquery-3.6.4.min.js");
});

app.get("/style", function (req, res) {
  res.sendFile(__dirname + "/deco.css");
});

app.get("/background", function (req, res) {
  res.sendFile(__dirname + "/Group10.svg");
});

var userId = 0;

io.on("connection", function (socket) {
  socket.userId = userId++;
  console.log("a user connected, user id: " + socket.userId);

  socket.on('spawn', function(msg){
	console.log('message from user ',msg);
	io.emit("spawn",msg);
  });

  socket.on('move', function(msg){
	console.log(msg);
	io.emit("move",msg);
});


  socket.on("joystickMove", function (msg) {
    console.log("Joystick : " + msg);
    io.emit("joystickMove", msg);
  });

  socket.on("gameover", () => {
    io.emit("gameover");
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
