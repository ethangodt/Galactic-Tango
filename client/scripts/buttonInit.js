(function (app) {
  'use strict';

  var readyButton = document.getElementById('readyButton');
  readyButton.pressed = false;

  var applyLoadingStyles = function () {
    // change button css to load state class
    readyButton.className = 'load';
  };
  
  readyButton.addEventListener('click', function () {
    console.log('button clicked');
    app.socket = io('http://localhost:8080');
    applyListeners();
  });

  // setup up another listener for game start that makes the button fade out, or something.

}(window.app));
