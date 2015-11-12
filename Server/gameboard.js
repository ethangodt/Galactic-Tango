var Snake = require('./Snake');

var Gameboard = function( numPlayer, sizeX, sizeY, initSize ) {
  this.initSize = initSize || 3;
  this.players = []; //array of current players
  this.apples = []; //array of apples
  this.numPlayer = numPlayer;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.init();
};

Gameboard.prototype.init = function() {
  var midPoint = [Math.floor(this.sizeX*.5), Math.floor(this.sizeY*.5)];
  var size = this.initSize;
  var startingPosOffset = [[-size, 0], [size,0], [0, -size], [0, size]];
  var startingDir = ['left', 'right', 'up', 'down']
  for (var i = 0; i < this.numPlayer; i++) {
    this.players.push(new Snake( midPoint[0] + startingPosOffset[i][0] , 
                                 midPoint[1] + startingPosOffset[i][1], startingDir[i], this.initSize ));
  };

};

Gameboard.prototype.getSnakes = function() {
  return this.players.map(function (snake) {
    return snake.getBody();
  })
};

Gameboard.prototype.checkCollission = function() {
  
};

Gameboard.prototype.tick = function() {
  this.players.forEach(function (snake) {
    snake.move();
  })
};

Gameboard.prototype.changeDir = function ( playerNum, dir ) {
  this.players[playerNum].setDirection(dir);
};

Gameboard.prototype.dropApple = function(x ,y) {

};

var gameboard = new Gameboard (1 , 1000, 500, 3);
console.log(gameboard.getSnakes())
gameboard.tick();
gameboard.tick();
gameboard.tick();
console.log(gameboard.getSnakes())
gameboard.changeDir(0, 'up')
gameboard.tick();
gameboard.tick();
gameboard.tick();
console.log(gameboard.getSnakes())


