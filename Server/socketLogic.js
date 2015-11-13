var rooms = require('./rooms');

// function to apply behavior to socket communication
module.exports = function (socket) {

  console.log('connection established');

  socket.on('disconnect', function () {
    // todo remove from current room
    // todo remove listeners
    console.log('server disconnected');
  });

  socket.on('turn', function (data) {
    // todo check to see if game is started
    // todo call game room turn handler
    for(var room in this.adapter.rooms){
      if(room.length === 7){
        var playerIndex = rooms.getRoom(room).players.indexOf(this.id);
        console.log('player index of turning snake is ' + playerIndex);
        rooms.getRoom(room).game.changeDir(playerIndex, data.direction);
      }
    }
  });

  rooms.placePlayer(socket);
};