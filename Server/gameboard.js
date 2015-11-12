var Snake = require('./Snake');

var Gameboard = function( numPlayer, sizeX, sizeY, initSize ) {
  this.initSize = initSize || 3;
  this.players = []; //array of current players
  this.apples = []; //array of apples
  this.numPlayer = numPlayer;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.init();
  setInterval(this.tick.bind(this), 1000);
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
  for (var i = 0; i < this.players.length; i++) {
      var head = this.players[i].getHead()
    for (var j = 0; j < this.players.length; j++){
      if (i === j){
        //console.log('continued');
        continue;
      } else {
        var body = this.players[j].getBody();
        for(var k = 0; k < body.length; k++){
          //console.log('head is', head, 'body part is', body[k])
          //console.log('i,j,k', i,j,k)
          if (arrayEqual(head, body[k])){
            return true;
          }
        }
      }
    }
  };
  return false;
};
function arrayEqual (arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1]
}


Gameboard.prototype.tick = function() {

    this.players.forEach(function (snake) {
      snake.move();
    });
  var gameData = this.getSnakes();
  return {
    snakes:[{
        location:gameData[0],
        id:0
      },
      {
        location:gameData[1],
        id:1
      }],
    collission:this.checkCollission()
    }
};

Gameboard.prototype.changeDir = function ( playerNum, dir ) {
  this.players[playerNum].setDirection(dir);
};

Gameboard.prototype.dropApple = function(x ,y) {

};


module.exports = Gameboard;

// gameboard.changeDir(0,'up')
// gameboard.changeDir(1,'up')
// gameboard.tick();
// gameboard.changeDir(0,'right')
// gameboard.changeDir(1,'down')
// gameboard.tick();
// gameboard.tick();


