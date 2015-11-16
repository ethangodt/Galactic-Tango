(function (app) {
  'use strict';
  app.socket;
  app.gameStart = false;
  app.userId;
  var dead = false;

  var readyButton = document.getElementById('readyButton');
  readyButton.pressed = false;

  var setButtonStyle = function () {
    if(readyButton.pressed) {
      readyButton.className = 'load';
    }
    if (app.gameStart) {
      readyButton.className = 'game-on';
    } else {
      readyButton.className = 'pre-click';
    }
  }
  readyButton.addEventListener('click', function () {
    if(!this.pressed) {
      if(!app.socket) {
        app.socket = openSocket();
      } else {
        //send a ready signal to server 
      }
      this.pressed = true;
    }
  });

  var iDied = function () {
    dead = true;
  };
  var iLost = function () {
    dead = true;
  };
  var iwon = function () {
    dead = true;
  };

  var setBorderColor = function () {
    var color = app.board.snakeColors[app.userId];

    readyButton.style.color = color;

  }

  var openSocket = function () {
      app.socket = io('http://localhost:8080');
      app.socket.on('update', function (gameData) {
        setBorderColor();
        app.board.updateBoard(gameData);
        app.gameStart = true;
        //might want to move this to the game start listener when we have that.
        //We need to add listeners here for game end, starting a new game(say the second or third) and countdown
        //*put them here.
        if(false && gameData.dead[app.user].isDead) {
          iDied();
        }
      });
      app.socket.on('game over', function (winner) {
        readyButton.pressed = false;
        app.gameStart = false;
        setButtonStyle();
        if(app.userId === winner) {
          iwon();
        } else {
          ilost();
        }
      });

      app.socket.on('gameStart', function (userId) {
        app.userId = userId;
        setBorderColor();
        app.board.updateBoard();
        var counter = 3;
        app.gameStart = true;
        setButtonStyle();
        readyButton.textContent = counter;
        var timer = setInterval(function () {
          readyButton.textContent = counter;
          // console.log(counter--);
          if(counter === 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
  }

}(window.app));
