//Note on rooms:
//There is a 'Room' class that has a list of players, a boolean to know if the game is in progress,
//and the game board associated with that room

//'rooms' is an object that contains as many instances of 'Room' as there are games.
//The key for each 'Room' in the 'room' object is the randomly generated room ID. 

//There is also a '.room' property on the socket.  This is used to quickly identify which room to access when an 
//event comes through a given socket.  

//Sockets also join 'rooms' via the Socket.join(room name) method.  This allows the io to broadcast information to 
//all sockets in a room by using io.emit(room name).  Socket.join does not interact with the 'rooms' object or the 
//.room property of the socket.

var utils = require('./utils/utils');
var gameLoop = require('./gameLoop');
var settings = require('./gameSettings');
var GameBoard = require('./gameboard');
var io = require('./server').io;

// rooms is the storage of Room objects for all games, currently running or waiting to begin
var rooms = {};

//Room constructor
var Room = function () {
  this.gameInProgress = false;
  this.game = null;
  this.players = [];
};

var currentRoomName = null;

//roomsManager contains the logic for filling up the current room, starting the game, and making a new room
var roomsManager = {

  getRoom: function (roomName) {
    return rooms[roomName];
  },
  
  launchGame: function () {
    var room = rooms[currentRoomName];
    //add a game state to the current room
    room.game = new GameBoard(settings.maxSnakes, settings.boardDimensions[0], settings.boardDimensions[1], settings.snakeStartLength, settings.starAdder);
    //On game start, tell each client their index so they can know what color snake they are
    for (var i = 0; i < room.players.length; i++) {
      io.to(room.players[i]).emit('gameStart', i);
    }
    this.getRoom(currentRoomName).gameInProgress = true;
    gameLoop(currentRoomName, this); // 2nd param is passing a reference to the room manager for the gameLoop
  },

  placePlayer: function (socket) {
    //Make a new room if none exist
    if (!currentRoomName) {
      currentRoomName = utils.generateRandomId(7);
      rooms[currentRoomName] = new Room();
    }
    
    //see note at the top of this file.
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
      //remove a player from the room if the game has not started.
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