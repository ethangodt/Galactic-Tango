// get id from this to make rooms
var socket = io('http://localhost:8080');

// socket.on('update', board.updateBoard);

socket.on('gameOver', function (scores) {console.log(scores)});

var turn = function (direction) {
  socket.emit('turn', {user: user, direction: direction})
};
