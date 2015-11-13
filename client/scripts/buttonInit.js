(function (app) {
  'use strict';
  app.socket;
  app.gameStart = false;
  app.user;
  var dead = false;

  var readyButton = document.getElementById('readyButton');
  readyButton.pressed = false;

  var setButtonStyle = function () {
    if(readyButton.pressed) {
      readyButton.className = 'load';
    } else if (app.gameStart) {
      readyButton.className = 'game-on';
    } else {
      readyButton.className = 'pre-click';
    }
  }
  readyButton.addEventListener('click', function () {
    if(!this.pressed) {
      if(!socket) {
        app.socket = openSocket();
      } else {
        //send a ready signal to server 
      }
      this.pressed = true;
      setButtonStyle();
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

  var setBoarderColor = function () {
    var color = app.board.snakeColors[app.user];

    readyButton.style += 'color:' + color + ';';

  }

  var openSocket = function () {
      app.socket = io('http://localhost:8080');
      app.socket.on('update', function (gameData) {
        app.board.updateBoard(gameData);
        //might want to move this to the game start listener when we have that.
        //We need to add listeners here for game end, starting a new game(say the second or third) and countdown
        //*put them here.
        if(gameData[app.user].isDead) {
          iDied();
        }
      });
      app.socket.on('gameEnd', function (scores) {
        readyButton.pressed = false;
        app.gameStart = false;
        setButtonStyle();
        if(!dead && scores[user] = Math.max(scores[user])) {
          iwon();
        } else if(!dead) {
          ilost();
        }
      });
      app.socket.on('countdown', function (user) {
        //add a graphic representation
        app.user = user
        setBoarderColor();
        app.board.updateBoard();
        var counter = 3;
        app.gameStart = true;
        setButtonStyle();
        readyButton.textContent = counter;
        var timer = setInterval(function () {
          readyButton.textContent = counter;
          console.log(counter--);
          if(counter === 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
  }

}(window.app));
