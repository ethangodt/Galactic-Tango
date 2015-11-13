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
  //offset from the middle
  var startingPosOffset = [[-size, 0], [size,0], [0, -size], [0, size]];
  var startingDir = ['left', 'right', 'up', 'down']
  //each player starts away from the center 
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
  var skippedHead = false;
  for (var i = 0; i < this.players.length; i++) {
      var head = this.players[i].getHead()
    for (var j = 0; j < this.players.length; j++){
      var body = this.players[j].getBody();
      for(var k = 0; k < body.length; k++){
        if (i === j && k ===0){
          continue;
        } else if (arrayEqual(head, body[k])){
          return true;
        }
      }
    }
  };
  return false;
};



Gameboard.prototype.tick = function() {

    this.players.forEach(function (snake) {
      snake.move();
    });
  var gameData = this.getSnakes();
  var snakeData = []
  for (var i = 1; i <= this.numPlayer; i++){
    snakeData.push({
      location:gameData[i],
      id: i-1
    })
  }
  return {
    snakes:snakeData,
    collission:this.checkCollission()
    }
};

Gameboard.prototype.changeDir = function ( playerNum, dir ) {
  this.players[playerNum].setDirection(dir);
};

Gameboard.prototype.dropApple = function(x ,y) {

};

module.exports = Gameboard;

function arrayEqual (arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1]
}

function test(gameboard) {
  //used for dev testing
  gameboard.tick();
  console.log(gameboard.checkCollission());
  console.log(gameboard.getSnakes());
}

