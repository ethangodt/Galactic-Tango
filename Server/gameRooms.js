var utils = require('utils/utils.js');

var Room = function (id, players) {
  this.id = id;
  this.players = players;
};

// when games end, delete the room from the rooms object
var rooms = {};

var roomsManager = {
  deleteRoom: function () {

  },
  addRoom: function () {
    // new up room and add to rooms
  }
};

// onboarding will be used to group players into rooms of 4 in order of arrival
// we may need to consider what happens if someone bails while in onboarding
// onboarding should fire an event or something to initiate the game when a complete
// room is passed to the official rooms object

// it would be great if we could send the room information back to the client as part of the
var onboarding = {
  players: [],
  setPlayer: function () {
    // add player to players array
    // checks to see if players length is 4
      // if it is then add the players to a room in the rooms object
      // clear the players array
  }
};

