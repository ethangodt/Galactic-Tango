(function (app) {
  'use strict';
  app.socket = io('http://localhost:8080');

  app.socket.on('update', board.updateBoard);

  app.socket.on('gameOver', function (scores) {console.log(scores)});

}(window.app));