var Snake = require('./Snake');

var Gameboard = function( numPlayer, sizeX, sizeY, initSize ) {
  this.initSize = initSize || 3;
  this.snakes = []; //array of current snakes
  this.stars = []; //array of stars
  this.walls = [];
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
  var startingDir = ['left', 'right', 'up', 'down'];

  //each player starts away from the center 
  for (var i = 0; i < this.numPlayer; i++) {
    this.snakes.push(new Snake( midPoint[0] + startingPosOffset[i][0] , 
                                 midPoint[1] + startingPosOffset[i][1], startingDir[i], this.initSize ));
  };

  //define walls
  for(var i = 0; i < this.sizeX; i++){
    this.walls.push([i, -1]);
    this.walls.push([i, this.sizeY]);
  }
  for(var i = 0; i < this.sizeY; i++){
    this.walls.push([-1, i]);
    this.walls.push([this.sizeX, i]);
  }

};

Gameboard.prototype.getLiveSnakes = function() {
  return this.snakes.reduce(function (snake) {
    if(!snake.dead){
      result.push(snake.body);
    }
    return result;
  }, []);
};

//loc is position to check for collisions
//checkAgainst is an array of tuples to look for collisions
Gameboard.prototype.checkCollision = function(loc, checkAgainst) {
  /*var skippedHead = false;
  for (var i = 0; i < this.snakes.length; i++) {
      var head = this.snakes[i].getHead()
    for (var j = 0; j < this.snakes.length; j++){
      var body = this.snakes[j].getBody();
      for(var k = 0; k < body.length; k++){
        if (i === j && k ===0){
          continue;
        } else if (arrayEqual(head, body[k])){
          return i;
        }
      }
    }
  };
  return -1;*/
  console.log(loc);
  for(var i = 0; i < checkAgainst.length; i++){
    if(arrayEqual(loc, checkAgainst[i])){
      return true;
    }
  }
  return false;
};



Gameboard.prototype.tick = function() {
  this.snakes.forEach(function (snake) {
    snake.move();
  });

  var snakeLocations = this.getSnakes();
  var snakeData = []
  for (var i = 0; i < this.numPlayer; i++){
    snakeData.push({
      location:snakeLocations[i],
      id: i
    })
  }

  var collision = false;
  var gameOver = false;
  
  for(var i = 0; i < this.snakes.length; i++){
    if(this.checkCollision(this.snakes[i].getHead(), this.getBarriers())){
      collision = true;
      gameOver = this.killSnake(i);
    }
  }

  return {
    snakes: snakeData,
    gameOver: gameOver,
    starLocation:this.stars
  }
};

Gameboard.prototype.killSnake = function (snakeIndex){
  this.snakes[snakeIndex].killSnake();
}

Gameboard.prototype.changeDir = function ( playerNum, dir ) {
  this.snakes[playerNum].setDirection(dir);
};

Gameboard.prototype.getBarriers = function(){
  var barriers = this.walls;
  for(var i = 0; i < this.snakes.length; i++){
    barriers.concat(this.snakes[i].getBody());
  }
  return barriers;
}

Gameboard.prototype.dropStars = function(x ,y) {

  function generateRandomLocation() {
    return [Math.floor(Math.random()*this.sizeX), Math.floor(Math.random()*this.sizeY)]
  }

  /*function checkForCollision (location) {
    var unavailableBlocks = this.getSnakes().reduce(function (blocks, snake) {
        return blocks.concat(snake);
    });
    for (var i = unavailableBlocks.length - 1; i >= 0; i--) {
      if (arrayEqual(unavailableBlocks[i],location)){
        return true;
      }
    }
    return false;
  }*/

  var checkLocations = this.snakes.concat(this.walls).concat(this.stars);
  do{
    var tempLocation = generateRandomLocation.call(this);
  } while (this.checkCollision(tempLocation, checkLocations));

  this.stars.push(tempLocation)

};

module.exports = Gameboard;

function arrayEqual (arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1]
}

function test(gameboard) {
  //used for dev testing
  console.log(gameboard.tick());
  console.log(gameboard.checkCollision());
  console.log('current snakes', gameboard.getSnakes());
}

// var gameboard = new Gameboard(2,20,20,5);
// // gameboard.dropStars()



