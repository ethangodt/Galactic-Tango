var Snake = function (headX, headY, InitialDirection, initLength, starAdder) {
  this.currDir = InitialDirection;
  this.body = [ [headX,headY] ];
  this.dead = false;
  this.init(initLength);
  this.starAdder = starAdder;
  this.ateStar = -1;
};

Snake.prototype.init = function(initLength) {
//add the tail for the beginning of the game
 
  var headDir = this.dirArray();
  for (var i = 1; i <= initLength; i++) {
    this.body.push([this.body[0][0] + (headDir[0] * -i), this.body[0][1] + (headDir[1] * -i)])
  }
};

Snake.prototype.dirArray = function() {
  var headDir = {
    up: [0, -1],
    down: [ 0, 1 ],
    left: [ -1, 0 ],
    right: [ 1, 0 ]
  };

  return headDir[this.currDir];
};

Snake.prototype.getTail = function () {
  return this.body[this.body.length-1];
};

Snake.prototype.getHead = function () {
  return this.body[0];
};

Snake.prototype.getBody = function () {
  return this.body;
};

Snake.prototype.setDirection = function ( direction ) {
  if (direction !== this.oppositeDirection()){
    this.currDir = direction;
  }
};

Snake.prototype.oppositeDirection = function () {
  var opposites = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  }

  return opposites[this.currDir];
}

Snake.prototype.getDirection = function () {
  return this.currDir;
};

Snake.prototype.killSnake = function () {
  this.body = [];
  this.dead = true;
}

Snake.prototype.move = function(eat) {
//ateStar is a boolean that is true if the player has just eaten an star  
  var headDir = this.dirArray();
  var head = this.body[0];
  this.body.unshift([head[0] + headDir[0], head[1] + headDir[1]]);

  if(this.ateStar === -1){
    this.body.pop();
  } else {
    //this could be refactored to a generic 'eatItem' function that takes an item type
    this.ateStar++;
    if(this.ateStar === this.starAdder){
      this.ateStar = -1;
    }
  }



};

module.exports = Snake;

// var snake = new Snake( 5 , 5 , 'right', 5)
// console.log(snake.getBody())
// snake.move();
// console.log(snake.getBody());
// snake.move(true);
// console.log(snake.getBody());
// snake.move();
// console.log(snake.getBody());
// snake.move();
// console.log(snake.getBody());


