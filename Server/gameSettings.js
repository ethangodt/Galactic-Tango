//This file holds the game settings.
module.exports = {
  maxSnakes: 4, //number of players to start the game
  snakeStartLength: 8, //initial length of snakes
  loopSpeed: 50, //number of milliseconds between each game update
  boardDimensions: [105, 58], //size of the board, in game squares (not pixels)
  starAdder: 10 //amount of body added to a snake when a star is eaten.
};