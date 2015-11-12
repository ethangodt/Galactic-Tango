(function (app) {
  'use strict';

  var readyButton = document.getElementById('readyButton');

  var xhrPlayerInit = function (cb) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/users');
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.send();

    xhr.onreadystatechange = function () {
      var DONE = 4;
      var OK = 200;
      if (xhr.readyState === DONE) {
        if (xhr.status !== OK) {
          console.log('Error: ' + xhr.status);
        } else {
          cb(xhr.responseText);
        }
      }
    };
  };

  var toLoadStyles = function () {
    // change button css to load state class
  };

  readyButton.addEventListener('click', function () {
    xhrPlayerInit(function (userData) {
      app.user = userData; // on successful init, set player object
    });
    toLoadStyles();
  });

  // setup up another listener for game start that makes the button fade out, or something.

}(window.app));
