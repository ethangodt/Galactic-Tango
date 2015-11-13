var settings = require('./gameSettings');
var io = require('./server.js').io;

console.log(io);

// todo fix getRoom irregularity
module.exports = function (roomName, getRoom) {
  var timer = setInterval(function () {
    //console.log('emitting to ' + roomName);
    //console.log('rooms = ', rooms);

    getRoom(roomName).gameInProgress = true;

    var gameData = getRoom(roomName).game.tick();
    io.to(roomName).emit('update', gameData);

    // todo end up deleting this for production
    if (gameData.collission !== -1){
      clearInterval(timer);
    }
  }, settings.loopSpeed);
};