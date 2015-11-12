Snake = function (headX, headY, InitialDirection) {
  this.currDir = InitialDirection;
  this.length = 3;
  this.body = [ [headX,headY] ];
  this.init();
}

Snake.prototype.init = function() {
//add the tail for the beginning of the game
  console.log(this.body)
  var initSize = 2;


  var headDir = this.dirArray();
  
  for (var i = 1; i <= initSize; i++) {
    this.body.push([this.body[0][0] + (headDir[0] * -i), this.body[0][1] + (headDir[1] * -i)])
  };
};

Snake.prototype.dirArray = function() {
    var headDir = {
    up: [0, -1],
    down: [ 0, 1 ],
    left: [ -1, 0 ],
    right: [ 1, 0 ],
  }

  return headDir[this.currDir];
};

Snake.prototype.getTail = function () {
  return this.body[this.body.length-1];
}

Snake.prototype.getHead = function () {
  return this.body[0];
}

Snake.prototype.getBody = function () {
  return this.body;
};

Snake.prototype.setDirection = function ( direction ) {
  this.currDir = direction;
};

Snake.prototype.getDirection = function () {
  return this.currDir;
};

Snake.prototype.move = function(eat) {
//eat is a boolean that is true if the player has just eaten an apple
  var headDir = this.dirArray();
  var head = this.body[0]
  this.body.unshift([head[0] + headDir[0], head[1] + headDir[1]]);
  if(!eat){
    this.body.pop();
  }

};

// var snake = new Snake( 5 , 5 , 'right')
// console.log(snake.getBody())
// snake.move();
// console.log(snake.getBody());
// snake.move(true);
// console.log(snake.getBody());
// snake.move();
// console.log(snake.getBody());
// snake.move();
// console.log(snake.getBody());


