(function (app) {
  'use strict';
  app.gameStart = false;
  app.userId;
  var gameOver = document.getElementById('gameOver');
  console.log(gameOver);

  var readyButton = document.getElementById('readyButton');
  readyButton.pressed = false;

  var setButtonStyle = function () {
    if(readyButton.pressed) {
      readyButton.className = 'load';
    }
    if (app.gameStart) {
      readyButton.className = 'game-on';
    } else {
      readyButton.className = 'init';
    }
  };

  readyButton.addEventListener('click', function () {

    if(!this.pressed && !app.gameStart) {
      app.board.updateBoard();
      openSocket();
      this.pressed = true;
      gameOver.style.display = 'none';
      readyButton.textContent = 'Waiting...'
    }

  });

  var iLost = function () {
    console.log('LOSER');
    gameOver.textContent = 'ALL HAIL ' + app.board.snakeColors[app.userId] + ', KING OF THE LOSERS!';
    gameOver.style.display = 'inline-block';
  };
  var iWon = function () {
    console.log('WINNER')
    gameOver.textContent = '"' + app.board.snakeColors[app.userId] + '" IS VICTORIOUS! NOMNOMNOM!'
    gameOver.style.display = 'inline-block';
  };

  var setBorderColor = function () {
    var color = app.board.snakeColors[app.userId];
    var board = document.getElementsByClassName('boardContainer')[0];
    board.style.borderColor = color;
  };

  var openSocket = function () {
    if(!app.socket) {
      app.socket = io();

      app.socket.on('update', function (gameData) {
        app.board.updateBoard(gameData);
        //might want to move this to the game start listener when we have that.
        //We need to add listeners here for game end, starting a new game(say the second or third) and countdown
        //*put them here.
      });

      app.socket.on('game over', function (winner) {
        console.log(winner)
        readyButton.pressed = false;
        app.gameStart = false;
        setButtonStyle();
        readyButton.textContent = 'Ready';
        if(app.userId === winner) {
          iWon();
        } else {
          iLost();
        }
        // app.socket.io.disconnect();

      });

      app.socket.on('gameStart', function (userId) {
        gameOver.style.display = 'none';
        app.userId = userId;
        setBorderColor();
        var counter = 4;
        app.gameStart = true;
        setButtonStyle();
        readyButton.textContent = --counter;
        var timer = setInterval(function () {
          readyButton.textContent = --counter;
          if(counter === 0) {
            readyButton.textContent = 'NOM NOM NOM'
            clearInterval(timer);
          }
        }, 1000);
      });
    } else {
      app.socket.emit('ready')
    }
  }

}(window.app));
