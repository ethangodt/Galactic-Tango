var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var applySocketLogic = require('./socketLogic');

app.use(express.static(__dirname + '/../client/'));

// setup game rooms file
// no onboarding apply directly to rooms
// make max rooms variable
// placePlayer function with all conditional logic and setting up socket information
// "apply listeners" function

io.on('connection', function (socket) {
  console.log('really');
  applySocketLogic(socket);
});

server.listen(8080);

module.exports = {
  app: app,
  io: io
};

