var express = require('express');
var app = express();
module.exports.server = require('http').Server(app);
// var io = require('socket.io')(server);
var socket = require('./socketServerInit.js');
var utils = require('./utils/utils.js');
var Gameboard = require('./gameboard.js')

app.use(express.static(__dirname + '/../client/'));

// app.get('/', function (req, res) {
//   console.log(__dirname + '/../client/index.html');
//   res.sendfile(__dirname + '/../client/index.html');
// });

// todo this userNumber information seems like it should go somewhere else more perm
var userNumber = 0;

app.get('/users', function (req, res) {
  res.json(userNumber++)
  // res.json({id: utils.generateRandomId(7)});

  if(userNumber === 1) {
    socket.on('connection', function (socket) {
      var board = new Gameboard(2, 100, 100, 3);
      var timer = setInterval(function () {
        var gameData = board.tick();
        socket.updateClients(gameData);
        if (gameData.collission){
          clearInterval(timer);
        }
      }, 1000)
    })
  }
});

module.exports.server.listen(8080);

