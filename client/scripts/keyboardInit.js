(function (app) {
  'use strict';
  
  //fire the turn event to the socket
  var turn = function (direction) {
      app.socket.emit('turn', {direction: direction});
  };
  
  //Listen for a user attempting to turn
  window.addEventListener('keydown', function(event) {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      event.preventDefault();
    }

    switch (event.keyCode) {
      case 37: // Left
        turn('left');
        break;

      case 38: // Up
        turn('up');
        break;

      case 39: // Right
        turn('right');
        break;

      case 40: // Down
        turn('down');
        break;
    }
  }, false);

}(window.app));
