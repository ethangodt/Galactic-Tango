function applyListeners () {
  //listen for board updates through the current board and call the updateBoard function
  app.socket.on('update', app.board.updateBoard.bind(app.board));
}