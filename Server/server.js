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

socket.on('connection', function () {
  console.log('connected!')
  var board = new Gameboard(2, 100, 50, 3);
  var timer = setInterval(function () {

    var gameData = board.tick();
    console.log(gameData);
    socket.updateClients(gameData);
    if (gameData.collission){
      clearInterval(timer);
    }
  }, 3000)
})


app.get('/users', function (req, res) {
  console.log('GET')
  res.json(userNumber++)
  // res.json({id: utils.generateRandomId(7)});
});

module.exports.server.listen(8080);

