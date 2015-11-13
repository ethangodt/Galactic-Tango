var utils = require('./utils/utils');
var gameLoop = require('./gameLoop');
var settings = require('./gameSettings');
var GameBoard = require('./gameboard');

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
    rooms[currentRoomName].game = new GameBoard(settings.maxSnakes, settings.boardDimensions[0], settings.boardDimensions[1], settings.snakeStartLength);
    gameLoop(currentRoomName, this); // 2nd param is passing a reference to the room manager for the gameLoop
  },
  placePlayer: function (socket) {
    if (!currentRoomName) {
      currentRoomName = utils.generateRandomId(7);
      rooms[currentRoomName] = new Room();
    }

    socket.join(currentRoomName);
    rooms[currentRoomName].players.push(socket.id);

    if(rooms[currentRoomName].players.length === settings.maxSnakes){
      this.launchGame();
      currentRoomName = null;
    }
  },
  handlePlayerDisconnect: function (socket) {
    // get room id
    // if room is not in progress, pull the player
    // if game is in progress, kill the snake
  }
};

module.exports = roomsManager;