

function applyListeners () {
  app.socket.on('update', app.board.updateBoard.bind(app.board));
  app.socket.on('gamestart', function (data) {
    console.log('index is ',data);
  });
}