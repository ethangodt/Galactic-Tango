var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// todo is there anyway to fix this
module.exports = {
  app: app,
  io: io
};

var applySocketLogic = require('./socketLogic');

app.use(express.static(__dirname + '/../client/'));

io.on('connection', function (socket) {
  applySocketLogic(socket);
});

server.listen(8080);
