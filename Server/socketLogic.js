var rooms = require('./rooms');

// function to apply behavior to socket communication
module.exports = function (socket) {
  socket.on('disconnect', function () {
    rooms.handlePlayerDisconnect(socket);
  });
 
  //When a player tries to turn, find the right room and player and call the changeDir method in that game.
  socket.on('turn', function (data) {
    var room = rooms.getRoom(this.room);
    if (rooms.getRoom(this.room).gameInProgress) {
      var playerIndex = rooms.getPlayerIndex(socket);
      room.game.changeDir(playerIndex, data.direction);
    }
  });

  //Send the socket to rooms for handling.
  socket.on('ready', function () {
    rooms.placePlayer(socket);
  });
};
