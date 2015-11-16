var Snake = require('./Snake');

//Gameboard constructor sets the initial game data.
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

//Gameboard.init sets the initial position of the snakes, items, and walls
Gameboard.prototype.init = function() {
  var midPoint = [Math.floor(this.sizeX*0.5), Math.floor(this.sizeY*0.5)];
  var size = this.initSize;

  //offset from the middle
  var startingPosOffset = [[-size, 0], [size,0], [0, -size], [0, size]];
  var startingDir = ['left', 'right', 'up', 'down'];

  //each player starts away from the center 
  for (var i = 0; i < this.numPlayer; i++) {
    this.snakes.push(new Snake( midPoint[0] + startingPosOffset[i][0] , 
                                 midPoint[1] + startingPosOffset[i][1], startingDir[i], this.initSize, this.starAdder ));
  }

  //define walls
  for(var j = 0; j < this.sizeX; j++){
    this.walls.push([j, -1]);
    this.walls.push([j, this.sizeY]);
  }
  for(var k = 0; k < this.sizeY; k++){
    this.walls.push([-1, k]);
    this.walls.push([this.sizeX, k]);
  }
  
  //number of stars is currently set to the number of players at the start of the game
  this.dropItems(this.numPlayer, 'star');
};

//Gameboard.getItemLocs returns array of tuples defining the current item locations
Gameboard.prototype.getItemLocs = function(){
  return this.items.map(function(item){
    return item.location;
  }, []);
};

//Gameboard.getSnakes returns an an array of all the snake bodies (which are arrays of tuples)
//Can take a boolean parameter to specify if you only want snakes that are alive
Gameboard.prototype.getSnakes = function(live) {
  if(!live) {
    return this.snakes.map(function (snake) {
      return snake.getBody();
    });
  } else {
    return this.snakes.reduce(function (liveSnakes, snake) {
      if(!snake.dead){
        liveSnakes.push(snake);
      }
      return liveSnakes;
    }, []);
  }
};

//Gameboard.checkCollision checks a position tuple and compares it against an array of tuples
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

//Gameboard.tick moves the game state forward
Gameboard.prototype.tick = function() {
  //move all live snakes forward
  this.snakes.forEach(function (snake) {
    if(!snake.dead){
      snake.move();
      for(var i = 0; i < this.items.length; i++){
        //check to see if a star was eaten
        if(this.checkCollision(snake.getHead(), [this.items[i].location])){
          var itemEaten = this.items.splice(i, 1);
          //ateStar = 0 is the initial condition of a snake that just ate a star
          //drop a new star when a star is eaten
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
  
  //Create snakeData (ids and locations) for the object to send to the client
  for (var j = 0; j < this.numPlayer; j++){
    snakeData.push({
      location:snakeLocations[j],
      id: j
    });
  }

  var collision = false;
  var winner = -1;
  
  //check to see if any snakes ran into another snake or a wall
  for(var k = 0; k < this.snakes.length; k++){
    if(!this.snakes[k].dead && this.checkCollision(this.snakes[k].getHead(), this.getBarriers(k))){
      collision = true;
      winner = this.killSnake(k);
    }
  }

  //return an object to be sent to the client
  return {
    snakes: snakeData,
    winner: winner,
    items: this.items
  };  
};

//Gameboard.killSnake returns the index of the winning snake if only one remains
//otherwise, it returns -1
//the functionality of this is unclear if two snakes collide head-to-head.  This needs to be investigated.
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
};

//Gameboard.chageDir sets the direction of a snake
Gameboard.prototype.changeDir = function ( playerNum, dir ) {
  this.snakes[playerNum].setDirection(dir);
};

//Gameboard.getBarriers takes a snakeIndex and returns an array of all the locations that it could
//collide with.  This incluede all snakes and walls and excludes the given snake's own head.
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
};

//Gameboard.generateRandomLocation returns a tuple representing a random location on the gameboard.
Gameboard.prototype.generateRandomLocation = function () {
  return [Math.floor(Math.random()*this.sizeX), Math.floor(Math.random()*this.sizeY)];
};

//Gameboard.dropItems takes a number of items to drop and the type of item
//currently, only stars are supported.  This can be expanded to include other item types. 
Gameboard.prototype.dropItems = function (numItems, type) {
  var itemLocation, checkLocations;

  for(var i = 0; i < numItems; i++){
    checkLocations = this.getSnakes().concat(this.getItemLocs());
    do{
      itemLocation = this.generateRandomLocation.call(this);
    } while (this.checkCollision(itemLocation, checkLocations));
    this.items.push({type: type, location: itemLocation});
  }

};

module.exports = Gameboard;

//arrayEqual is a utility function to compare two tuples.
function arrayEqual (arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}