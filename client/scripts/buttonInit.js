(function (app) {
  'use strict';

  var readyButton = document.getElementById('readyButton');

  var applyLoadingStyles = function () {
    // change button css to load state class
  };
  
  readyButton.addEventListener('click', function () {
    console.log('button clicked');
    app.socket = io('http://localhost:8080');
    app.socket.on('update', app.board.updateBoard.bind(app.board));
  });

  // setup up another listener for game start that makes the button fade out, or something.

}(window.app));
