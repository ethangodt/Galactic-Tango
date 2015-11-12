
var users = [];
var nextUserId = 0;

module.exports.io = function (server) {
  var io = require('socket.io');
  var socket = io(server);

  module.exports.updateClients = function (board) {
    socket.emit('update', board);
    //can be caught on the client-side with io.on('update', callback)
  }

  module.exports.gameEnd = function (scores) {
    socket.emit('gameOver', scoreBoard);
  }
}
