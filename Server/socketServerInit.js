var io = require('socket.io');
var server = require('./server.js');

// module.exports = io(server);

module.exports = io(server.server);

module.exports.on('turn', function(){});

module.exports.updateClients = function (gameData) {
 this.emit('update', gameData);
 //can be caught on the client-side with io.on('update', callback)
}
