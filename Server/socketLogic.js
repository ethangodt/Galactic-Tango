var rooms = require('./rooms');

// function to apply behavior to socket communication
module.exports = function (socket) {
  console.log('connection established');

  socket.on('disconnect', function () {
    // todo remove from current room
    rooms.handlePlayerDisconnect(socket);
    console.log('server disconnected');
  });

  socket.on('turn', function (data) {
    var room = rooms.getRoom(this.room);
    if (room.game) {
      var playerIndex = rooms.getPlayerIndex(socket);
      room.game.changeDir(playerIndex, data.direction);
    }
  });

  rooms.placePlayer(socket);
};