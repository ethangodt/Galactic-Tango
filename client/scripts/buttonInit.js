(function (app) {
  'use strict';

  app.gameStart = false; // keeps track of whether a game is currently in progress
  var gameOver = document.getElementById('gameOver'); //the lose/win message div
  var readyButton = document.getElementById('readyButton');
  readyButton.pressed = false; //keeps track of whether or not the button is clickable.

  //sets the class of the ready button based on game state.  only the init style has been implemented
  var setButtonStyle = function () {
    if(readyButton.pressed) {
      console.log('waiting');
      readyButton.className = 'load';
      readyButton.textContent = 'Waiting...';
    } else {
      readyButton.className = 'init';
      readyButton.textContent = 'Ready';
    }
    if (app.gameStart) {
      console.log('game on!');
      readyButton.className = 'game-on';
      readyButton.textContent = 'NOM NOM NOM';
    }
  };

  //checks if the button has been pressed or a game has started.  if it hasn't then it opens the socket and
  //resets the board, gets rid of the win/lose message, sets the button text to 'Waiting...'
  readyButton.addEventListener('click', function () {
    if(!this.pressed && !app.gameStart) {
      app.board.updateBoard();
      openSocket();
      this.pressed = true;
      gameOver.style.display = 'none';
      setButtonStyle();
    }
  });

  //sets and displays the lose message
  var iLost = function () {
    gameOver.textContent = 'ALL HAIL ' + app.board.snakeColors[app.userId] + ', KING OF THE LOSERS!';
    gameOver.style.display = 'inline-block';
  };
  //sets and displays the win message
  var iWon = function () {
    gameOver.textContent = '"' + app.board.snakeColors[app.userId] + '" IS VICTORIOUS! NOMNOMNOM!';
    gameOver.style.display = 'inline-block';
  };

  //sets the border color or the board based on the userId
  var setBorderColor = function () {
    var color = app.board.snakeColors[app.userId];
    var board = document.getElementsByClassName('boardContainer')[0];
    board.style.borderColor = color;
  };

  //if a socket hasn't been opened, it opens one and attaches listeners, otherwise it emits a 'ready' signal
  //to the server to be put in a new room.
  var openSocket = function () {
    if(!app.socket) {
      // Code here will be linted with JSHint.
      /* jshint ignore:start */
      // Code here will be ignored by JSHint.
      app.socket = io();
      /* jshint ignore:end */
      //updates the game board when the server tells it to
      app.socket.on('update', function (gameData) {
        app.board.updateBoard(gameData);
      });

      //resets button and state variables on 'game over' signal, displays win/lose message.  It leaves the board
      //as it was at the end of the game.
      app.socket.on('game over', function (winner) {
        readyButton.pressed = false;
        app.gameStart = false;

        setButtonStyle();
        if(app.userId === winner) {
          iWon();
        } else {
          iLost();
        }
      });

      //on 'gameStart' signal starts a countdown in the ready button.  removes the win/lose message, changes the 
      //border color, sets gameStart to true.  Sets the button to gameMode.
      app.socket.on('gameStart', function (userId) {
        gameOver.style.display = 'none';
        app.userId = userId;
        app.gameStart = true;
        setBorderColor();

        var counter = 4;
        readyButton.textContent = --counter;
        var timer = setInterval(function () {
          readyButton.textContent = --counter;
          if(counter === 0) {
            clearInterval(timer);
            setButtonStyle();
          }
        }, 1000);
      });
    } else {
      app.socket.emit('ready');
    }
  };

}(window.app));
