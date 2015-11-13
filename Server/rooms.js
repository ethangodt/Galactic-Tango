var utils = require('./utils/utils');
var gameLoop = require('./gameLoop');
var settings = require('./gameSettings');
var GameBoard = require('./gameboard');
var io = require('./server').io;

// the main store for all currently running, and waiting games
var rooms = {};

var Room = function () {
  this.gameInProgress = false;
  this.game = null;
  this.players = [];
};

var currentRoomName = null;

var roomsManager = {
  getRoom: function (roomName) {
    return rooms[roomName];
  },
  launchGame: function () {
    var room = rooms[currentRoomName];
    room.game = new GameBoard(settings.maxSnakes, settings.boardDimensions[0], settings.boardDimensions[1], settings.snakeStartLength);
    for (var i = 0; i < room.players.length; i++) {
      io.to(room.players[i]).emit('gameStart', i);
    }
    gameLoop(currentRoomName, this); // 2nd param is passing a reference to the room manager for the gameLoop

  },
  placePlayer: function (socket) {
    if (!currentRoomName) {
      currentRoomName = utils.generateRandomId(7);
      rooms[currentRoomName] = new Room();
    }

    socket.room = currentRoomName;
    socket.join(currentRoomName);
    rooms[currentRoomName].players.push(socket.id);

    console.log('Current room has ' + rooms[currentRoomName].players.length + ' players');

    if(rooms[currentRoomName].players.length === settings.maxSnakes){
      this.launchGame();
      currentRoomName = null;
    }
  },
  handlePlayerDisconnect: function (socket) {
    var roomName = socket.room;
    var room = this.getRoom(roomName);

    if (room.gameInProgress) {
      // kill snake and pass player index
    } else {
      room.players = room.players.filter(function(player) {
        return player !== socket.id;
      })
    }
  },
  getPlayerIndex: function (socket) {
    return this.getRoom(socket.room).players.indexOf(socket.id);
  }
};

module.exports = roomsManager;