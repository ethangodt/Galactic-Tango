
var users = [];
var nextUserId = 0;

module.exports.io = function (server) {
  var io = require('socket.io');
  var socket = io(server);

  var boardController = require('SERVER_GAME_BOARD_MODULE')

  socket.on('turn', boardController.turn);
}
