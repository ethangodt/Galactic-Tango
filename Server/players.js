var Player = function () {
  // this needs to be changed to use client socket id
  this.id = utils.generateRandomId(7);
  // it would also be ideal to have a room number associated with the player so that lookup later is easier
};