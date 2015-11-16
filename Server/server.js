var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

module.exports = {
  app: app,
  io: io
};

var applySocketLogic = require('./socketLogic');

app.use(express.static(__dirname + '/../client/'));

//Whenever a socket connects, route it to './socketLogic' for handling
io.on('connection', function (socket) {
  applySocketLogic(socket);
});

server.listen(process.env.PORT || 8080);
console.log('listening on ',process.env.PORT || 8080);

