var settings = require('./gameSettings');
var io = require('./server.js').io;

module.exports = function (roomName, rooms) {
  setTimeout(function (){ // delays the gameLoop for a three second countdown on the client side

    var timer = setInterval(function () { // set interval is actual game loop
      // where is this placed?
      var gameData = rooms.getRoom(roomName).game.tick();
      io.to(roomName).emit('update', gameData);
      // gameData.winner is -1 when the game is not over.  Otherwise it is equal to the index of the winner.
      if (gameData.winner !== -1){
        io.to(roomName).emit('game over', gameData.winner);
        clearInterval(timer);
        // endGame is near finished and is meant to delete rooms from the 'rooms' object at the end of the game
        // rooms.endGame(roomName);
      }
    }, settings.loopSpeed);
  }, 3000);
};