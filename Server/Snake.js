//Snake constructor creates a new snake
var Snake = function (headX, headY, InitialDirection, initLength, starAdder) {
  this.currDir = InitialDirection;
  this.prevDir = this.currDir;
  //snake body is stored as an array of tuples defining the snake's locations.  The head is defined as snake.body[0].
  this.body = [ [headX,headY] ];
  this.dead = false;
  this.init(initLength);
  this.starAdder = starAdder;
  this.ateStar = -1;  //ateStar = -1 is the value for a snake that has not eaten a star.
};

//Snake.init adds the body to the head of a snake
Snake.prototype.init = function(initLength) {
  var headDir = this.dirArray();
  for (var i = 1; i <= initLength; i++) {
    this.body.push([this.body[0][0] + (headDir[0] * -i), this.body[0][1] + (headDir[1] * -i)]);
  }
};

//Snake.dirArray translates a direction (up, down, left, right) into coordinates for snake movement
Snake.prototype.dirArray = function() {
  var headDir = {
    up: [0, -1],
    down: [ 0, 1 ],
    left: [ -1, 0 ],
    right: [ 1, 0 ]
  };

  return headDir[this.currDir];
};

// Snake.getTail returns a tuple representing the tail of the snake
Snake.prototype.getTail = function () {
  return this.body[this.body.length-1];
};

// Snake.getHead returns a tuple representing the head of the snake
Snake.prototype.getHead = function () {
  return this.body[0]
};

// Snake.getTail returns an array of tuples defining all positions of the snake, including the head.
Snake.prototype.getBody = function () {
  return this.body;
};

//Snake.setDirection takes an argument and sets it to current direction, unless the snake is trying to go backwards
Snake.prototype.setDirection = function ( direction ) {
  if (direction !== this.oppositeDirection()) {
    this.currDir = direction;
  }
};

//Snake.oppositeDirection returns the opposite of the snake's current direction.
Snake.prototype.oppositeDirection = function () {
  var opposites = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  };
  return opposites[this.prevDir];
};


//Snake.getDirection returns a snake's current direction.
Snake.prototype.getDirection = function () {
  return this.currDir;
};

//Snake.killSnake sets the body to an empty array and sets the dead parameter as true
Snake.prototype.killSnake = function () {
  this.body = [];
  this.dead = true;
};

//Snake.move advances the position of a snake by one.
Snake.prototype.move = function() {
  var headDir = this.dirArray();
  this.prevDir = this.currDir;
  var head = this.body[0];
  this.body.unshift([head[0] + headDir[0], head[1] + headDir[1]]);
  
  //if snake has not eaten a star, remove its tail
  if(this.ateStar === -1){
    this.body.pop();
  } else {
    //if a snake has eaten a star, increment its ateStar property until it equals the starAdder property, then reset.
    this.ateStar++;
    if(this.ateStar === this.starAdder){
      this.ateStar = -1;
    }
  }
};

module.exports = Snake;

