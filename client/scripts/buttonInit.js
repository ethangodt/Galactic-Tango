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
    if(!this.pressed) {
      if(!app.socket) {
        console.log('socket open');
        openSocket();
      } else {
        //send a ready signal to server 
      }
      this.pressed = true;
      gameOver.style.display = 'none';
    }
  });

  var iLost = function () {
    console.log('LOSER');
    gameOver.textContent = 'ALL HAIL ' + app.board.snakeColors[app.userId] + ' KING OF THE LOSERS';
    gameOver.style.display = 'inline-block';
  };
  var iWon = function () {
    console.log('WINNER')
    gameOver.textContent = 'YOU HAVE NOMNOMNOMED AND SURVIVED'
    gameOver.style.display = 'inline-block';
  };

  var setBorderColor = function () {
    var color = app.board.snakeColors[app.userId];
    var board = document.getElementsByClassName('boardContainer')[0];
    board.style.borderColor = color;
  };

  var openSocket = function () {
    app.socket = io();

    app.socket.on('update', function (gameData) {
      app.board.updateBoard(gameData);
      app.gameStart = true;
      //might want to move this to the game start listener when we have that.
      //We need to add listeners here for game end, starting a new game(say the second or third) and countdown
      //*put them here.
    });

    app.socket.on('game over', function (winner) {
      console.log(winner)
      readyButton.pressed = false;
      app.gameStart = false;
      setButtonStyle();
      console.log('derpderpderp')
      if(app.userId === winner) {
        iWon();
      } else {
        iLost();
      }
    });

    app.socket.on('gameStart', function (userId) {
      app.userId = userId;
      setBorderColor();
      app.board.updateBoard();
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
      }, 800);
    });
  }

}(window.app));
