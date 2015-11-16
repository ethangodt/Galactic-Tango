//This file holds the game settings.
module.exports = {
  maxSnakes: 2, //number of players to start the game
  snakeStartLength: 10, //initial length of snakes
  loopSpeed: 50, //number of milliseconds between each game update
  boardDimensions: [105, 58], //size of the board, in game squares (not pixels)
  starAdder: 3 //amount of body added to a snake when a star is eaten.
};