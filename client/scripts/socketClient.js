var socket = io('http://localhost:8080');

//socket.on('update', board.updateBoard);

socket.on('gameOver', function (scores) {console.log(scores)});

var xhr = new XMLHttpRequest();

xhr.open('GET', '/users');
xhr.overrideMimeType("text/plain; charset=x-user-defined")
xhr.send();

xhr.onreadystatechange = function () {
  var DONE = 4;
  var OK = 200;
  if (xhr.readyState === DONE) {
    if (xhr.status !== OK) {
      console.log('Error: ' + xhr.status);
    } else {
      // add stuff here
      user = xhr.responseText
    }
  }
};


var turn = function (direction) {
  socket.emit('turn', {user: user, direction: direction})
}
