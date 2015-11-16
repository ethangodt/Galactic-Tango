/* jshint ignore:start */
//listen for board updates through the current board and call the updateBoard function
function applyListeners () {
  app.socket.on('update', app.board.updateBoard.bind(app.board));
}
/* jshint ignore:end */
