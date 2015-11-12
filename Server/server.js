var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketFunc = require('./socketServerInit.js');
var utils = require('./utils/utils.js');

app.use(express.static(__dirname + '/../client/'));

// app.get('/', function (req, res) {
//   console.log(__dirname + '/../client/index.html');
//   res.sendfile(__dirname + '/../client/index.html');
// });

// todo this userNumber information seems like it should go somewhere else more perm
userNumber = 0;

app.get('/users', function (req, res) {
  userNumber++;
  res.json({id: utils.generateRandomId(7)});
  if(userNumber === 1) {
    var socket = socketFunc.io(server);
    socket.on('connection', require('./gameboard.js'));
  }
});

server.listen(8080);