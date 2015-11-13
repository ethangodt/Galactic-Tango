var express = require('express');
var app = express();
module.exports.server = require('http').Server(app);
// var io = require('socket.io')(server);
var io = require('./socketServerInit.js');
var utils = require('./utils/utils.js');
var Gameboard = require('./gameboard.js')
var maxPlayers = 1;  // move this

app.use(express.static(__dirname + '/../client/'));



// app.get('/', function (req, res) {
//   console.log(__dirname + '/../client/index.html');
//   res.sendfile(__dirname + '/../client/index.html');
// });

// todo this userNumber information seems like it should go somewhere else more perm
//var userNumber = 0;

/*socket.on('connection', function () {
  console.log('connected!')
  var board = new Gameboard(2, 100, 50, 3);
  var timer = setInterval(function () {

    var gameData = board.tick();
    console.log(gameData);
    socket.updateClients(gameData);
    if (gameData.collission){
      clearInterval(timer);
    }
  }, 3000)*/
//})

/*var rooms = {};

var onboarding = {
  players: [],
  addUser: function(userID){

    this.players.push(userID);
    if(this.players.length === maxPlayers){
      this.clearOnboarding;
    }
  }
  clearOnboarding: function(){
    rooms[utils.generateRandomId(7)] = {
      players: this.players,
      gameStarted: false
    };
    this.players = [];
  }
};*/

var rooms = {};

var currentRoom = {
  players: [],
  roomName: '',
  gameStarted: false
};





io.on('connection', function (socket) {

  console.log('connection established');

  // setup listeners
  // turn
  // disconnect

  socket.on('disconnect', function () {
    // remove from current room
    //TODO: remove listeners
    room.players.pop();
    console.log('server disconnected');
    //this.removeListener('turn');
  })

  socket.on('turn', function (data) {
    // check to see if game is started
    // pass the data to the game
    console.log('turn data = ', data);
    
    for(var room in this.adapter.rooms){
      if(room.length === 7){
        var playerIndex = rooms[room].players.indexOf(this.id);
        console.log('player index of turning snake is ' + playerIndex);
        rooms[room].game.changeDir(playerIndex, data);
      }
    }
  })

  
  if(currentRoom.players.length === 0){
    console.log('new room created')
    currentRoom.roomName = utils.generateRandomId(7);
  }

  socket.join(currentRoom.roomName);

  currentRoom.players.push(socket.id);

  if(currentRoom.players.length === maxPlayers){
    console.log('maxPlayers reached.  Game created in ' + currentRoom.roomName);
    
    console.log('currentRoom = ', currentRoom);
    rooms[currentRoom.roomName] = currentRoom;

    rooms[currentRoom.roomName].game = new Gameboard(maxPlayers, 105, 58, 3);


    var timer = setInterval((function (roomName){ return function () {
      console.log('emitting to ' + roomName);
      console.log('rooms = ', rooms);


      
      var gameData = rooms[roomName].game.tick();
      //console.log(gameData);
      io.to(roomName).emit('update', gameData);
      if (gameData.collission){
        clearInterval(timer);
      }
    }})(currentRoom.roomName), 1000);

    
    currentRoom = {
      players: [],
      roomName: '',
      gameStarted: false
    };
  }

  //onboarding.addUser(socket.id);

  //console.dir(socket.adapter.rooms);




  //currentRoom
  //currentRoom is full
  //add currentRoom to Room Object
})

var launchGame = function(){
  currentRoom.gameStarted = true;

}


//socket connected, callback {
  //TODO: socket disconnect method 
    //if game not started, remove from room array
    //if game started, X
  
  //push user into room array using socket.ID
  //socket.join room

  //Room object -- 
    //room name (for socket.join)
    //array of socketIDs in that room
    //game started?

  //maintain an object of all players?
    //key : value --> socketID : roomName
    //this lets us quickly identify what room to go to when we get a turn event

  //is room.users full (2)?
    //if so, instantiate a gameBoard
      //set interval function(){ 
        //gameData = gameBoard.tick();
        //io.to(room.name).emit(gameData)?
        //what is emit vs updateClients?
      //make a new room

//}


app.get('/users', function (req, res) {
  console.log('GET')
  //res.json(userNumber++)
  // res.json({id: utils.generateRandomId(7)});
  res.send();
});

module.exports.server.listen(8080);

