var settings = require('./gameSettings');
var io = require('./server.js').io;

// todo is there any way to fix getRoom injection irregularity
module.exports = function (roomName, rooms) {
  var timer = setInterval(function () {

    rooms.getRoom(roomName).gameInProgress = true;

    var gameData = rooms.getRoom(roomName).game.tick();
    io.to(roomName).emit('update', gameData);

    // todo end up deleting this for production
    if (gameData.collission !== -1){
      clearInterval(timer);
    }
  }, settings.loopSpeed);
};