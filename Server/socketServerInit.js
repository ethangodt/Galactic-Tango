var io = require('socket.io');

module.exports.io = function (server) {

  var socket = io(server);

  module.exports.updateClients = function (gameData) {
  socket.emit('update', gameData);
  //can be caught on the client-side with io.on('update', callback)
  }

  module.exports.gameEnd = function (scores) {
    socket.emit('gameOver', scoreBoard);
  }

  var boardController = require('./gameboard');

  socket.on('turn', function(){});

  return socket;
}
