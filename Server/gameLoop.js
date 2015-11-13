var settings = require('./gameSettings');
var io = require('./server.js').io;

module.exports = function (roomName, rooms) {
  // todo is there any way to fix getRoom injection irregularity
  setTimeout(function (){ // delays the gameLoop for a three second countdown on the client side
    var timer = setInterval(function () {

      rooms.getRoom(roomName).gameInProgress = true;

      var gameData = rooms.getRoom(roomName).game.tick();
      io.to(roomName).emit('update', gameData);

    // todo end up deleting this for production
    if (gameData.collision){
      console.log('collision detected');
    }
  }, settings.loopSpeed);
};