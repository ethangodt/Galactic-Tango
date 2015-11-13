(function (app) {
  'use strict';
  window.socketOpen = false

  var readyButton = document.getElementById('readyButton');
  readyButton.pressed = false;

  var setButtonStyle = function () {
    if(readyButton.pressed) {
      readyButton.className = 'load';
    } else if (window.myBoard.gameStart) {
      readyButton.className = 'game-on';
    } else {
      readyButton.className = 'pre-click';
    }
  }
  readyButton.addEventListener('click', function () {
    if(!this.pressed) {
      if(!socketOpen) {
        var socket = io('http://localhost:8080');
        window.socketOpen = true
        socket.on('update', function (gameData) {
          window.myBoard.updateBoard(gameData);
          window.myBoard.gameStart = true;
          setButtonStyle();
          //We need to add listeners here for game end, starting a new game(say the second or third) and countdown
        })
      }
      this.pressed = true;
      setButtonStyle();
    }
  });


}(window.app));
