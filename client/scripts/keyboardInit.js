(function (app) {
  'use strict';

  var turn = function (direction) {
      app.socket.emit('turn', {direction: direction})
  };

  window.addEventListener('keydown', function(event) {
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
