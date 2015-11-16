//get the canvas element from the DOM and create a new board.
(function (app) {
  
  var canvas = document.getElementsByClassName('gameBoard')[0];  
  app.board = new app.Board(1050, 580, canvas);
  app.board.updateBoard();

})(window.app);
