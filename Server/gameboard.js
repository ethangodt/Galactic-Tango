var Snake = require('./Snake');

var Gameboard = function( numPlayer, sizeX, sizeY, initSize, starAdder ) {
  this.initSize = initSize || 3;
  this.snakes = []; //array of current snakes
  this.items = []; //array of items
  this.walls = [];
  this.starAdder = starAdder;
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
                                 midPoint[1] + startingPosOffset[i][1], startingDir[i], this.initSize, this.starAdder ));
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

  this.dropItems(this.numPlayer, 'star');
};

Gameboard.prototype.getItemLocs = function(){
  return this.items.map(function(item){
    return item.location;
  }, []);
}

Gameboard.prototype.getSnakes = function(live) {
  if(!live) {
    return this.snakes.map(function (snake) {
      return snake.getBody();
    })
  } else {
    return this.snakes.reduce(function (liveSnakes, snake) {
      if(!snake.dead){
        liveSnakes.push(snake);
      }
      return liveSnakes;
    }, [])
  }
};

//loc is position to check for collisions
//checkAgainst is an array of tuples to compare against
Gameboard.prototype.checkCollision = function(loc, checkAgainst) {
  for(var i = 0; i < checkAgainst.length; i++){
    if(arrayEqual(loc, checkAgainst[i])){
      return true;
    }
  }
  return false;
};


Gameboard.prototype.tick = function() {
  this.snakes.forEach(function (snake) {
    if(!snake.dead){
      snake.move();
      for(var i = 0; i < this.items.length; i++){
        if(this.checkCollision(snake.getHead(), [this.items[i].location])){
          var itemEaten = this.items.splice(i, 1);
          if(itemEaten[0].type === 'star'){
            snake.ateStar = 0;
            this.dropItems(1, 'star');
          }
        }
      }
    }
  }, this);

  var snakeLocations = this.getSnakes();
  var snakeData = [];

  for (var i = 0; i < this.numPlayer; i++){
    snakeData.push({
      location:snakeLocations[i],
      id: i
    })
  }

  var collision = false;
  var winner = -1;
  
  for(var i = 0; i < this.snakes.length; i++){
    if(!this.snakes[i].dead && this.checkCollision(this.snakes[i].getHead(), this.getBarriers(i))){
      collision = true;
      winner = this.killSnake(i);
    }
  }

  return {
    snakes: snakeData,
    winner: winner,
    items: this.items
  }
};

//killSnake returns the index of the winning snake if only one remains
//otherwise, it returns -1
Gameboard.prototype.killSnake = function (snakeIndex){
  var deadSnakes = 0;
  var winner = 0;
  this.snakes[snakeIndex].killSnake();
  for(var i = 0; i < this.snakes.length; i++){
    winner += i;
    if(this.snakes[i].dead){
      winner -= i;
      deadSnakes++;
    }
  }

  return (deadSnakes+1 === this.numPlayer) ? winner : -1;
}

Gameboard.prototype.changeDir = function ( playerNum, dir ) {
  this.snakes[playerNum].setDirection(dir);
};

Gameboard.prototype.getBarriers = function(snakeIndex){
  var barriers = this.walls;
  for(var i = 0; i < this.snakes.length; i++){
    if(i !== snakeIndex) {
      barriers = barriers.concat(this.snakes[i].getBody());
    } else {
      barriers = barriers.concat(this.snakes[i].getBody().slice(1));
    }
  }
  return barriers;
}

Gameboard.prototype.generateRandomLocation = function () {
  return [Math.floor(Math.random()*this.sizeX), Math.floor(Math.random()*this.sizeY)]
}

Gameboard.prototype.dropItems = function (numItems, type) {
  var itemLocation, checkLocations;

  for(var i = 0; i < numItems; i++){
    checkLocations = this.getSnakes().concat(this.getItemLocs());
    do{
      itemLocation = this.generateRandomLocation.call(this);
    } while (this.checkCollision(itemLocation, checkLocations));

    this.items.push({type: type, location: itemLocation});
  };

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




