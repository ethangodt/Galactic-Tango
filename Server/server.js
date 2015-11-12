var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketFunc = require('./socketServerInit.js');

app.use(express.static(__dirname + '/../client/'));

server.listen(8080);

// app.get('/', function (req, res) {
//   console.log(__dirname + '/../client/index.html');
//   res.sendfile(__dirname + '/../client/index.html');
// });
userNumber = 0;
app.get('/users', function (req, res) {
  res.json({id: userNumber++});
  if(userNumber === 1) {
    var socket = socketFunc.io(server);
    socket.on('connection', require('./gameboard.js'));
  }
})


