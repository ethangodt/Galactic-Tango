var settings = require('./gameSettings');
var io = require('./server.js').io;

module.exports = function (roomName, rooms) {
  setTimeout(function (){ // delays the gameLoop for a three second countdown on the client side

    var timer = setInterval(function () { // set interval is actual game loop
      var gameData = rooms.getRoom(roomName).game.tick();
      io.to(roomName).emit('update', gameData);
      if (gameData.winner !== -1){ // check for winner
        io.to(roomName).emit('game over', gameData.winner);
        clearInterval(timer);
      }
    }, settings.loopSpeed);

  }, 3000);
};