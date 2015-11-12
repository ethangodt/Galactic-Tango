Snake = function (headX, headY, InitialDirection) {
  this.headX = headX;
  this.headY  = headY;
  this.currDir = InitialDirection;
  this.length = 3;
  this.body = [ [headX,headY] ]
  Snake.prototype.init();
}

Snake.prototype.init = function() {
  var tailDir = {
    up: [0, 1],
    down: []
  }
  if (this.currDir === 'up') {
    this.body.push( [this.headX, this.headY + 1] )
  }
};

Snake.prototype.setDirection = function ( direction ) {
  this.currDir = direction;
};

Snake.prototype.getDirection = function () {
  return this.currDir;
};

Snake.prototype
