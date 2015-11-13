(function (app) {

  var canvas = document.getElementsByClassName('gameBoard')[0];  
  app.board = new app.Board(1050, 580, canvas);
  app.board.updateBoard();

})(window.app);
