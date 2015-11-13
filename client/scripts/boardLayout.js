
var Board = function(width, height, canvas){
  this.canvas = canvas;
  this.pixels = 10;

  this.width = Math.floor(width / this.pixels);
  this.height = Math.floor(height / this.pixels);

  this.canvas.setAttribute('width', width);
  this.canvas.setAttribute('height', height);

  this.canvasContext = this.canvas.getContext('2d');
  this.snakeColors = ['red', 'blue', 'green', 'purple'];
};

Board.prototype.updateSquare = function(square, color){
  this.canvasContext.fillStyle = color;
  this.canvasContext.fillRect(square[0]*this.pixels, square[1]*this.pixels, this.pixels, this.pixels);
};

Board.prototype.renderWalls = function(walls){
  for(var col = 0; col < this.width; col++){
    this.updateSquare([col, 0], 'black');
    this.updateSquare([col, this.height-1], 'black');
  }
  for(var row = 0; row < this.height; row++){
    this.updateSquare([0, row], 'black');
    this.updateSquare([this.width-1, row], 'black');
  }

  if(walls){
    for(var i = 0; i < walls.length; i++){
      this.updateSnake(walls[i], 'black');
    }
  }
};

Board.prototype.initialRender = function(){
  for(var row = 0; row < this.height; row++){
    for(var col = 0; col < this.width; col++){
      if((row + col) % 2){
        this.updateSquare([col,row], 'grey');
      }
    }
  }
};

Board.prototype.updateSnake = function(snake, color){ 
  for(var i = 0; i < snake.length; i++){
    this.updateSquare(snake[i], color);
  }
};

Board.prototype.updateBoard = function(gameObject){
  this.canvasContext.clearRect(0,0, this.width*this.pixels, this.height*this.pixels);
  this.initialRender();
  this.renderWalls();

  if(gameObject){
    gameObject.snakes.forEach(function(snake){
      this.updateSnake(snake.location, this.snakeColors[snake.id]);  
    }, this);

    gameObject.stars.forEach(function(star){
      this.updateStar(star.location);  
    }, this);
  }
};

Board.prototype.updateStar = function(location){
  this.updateSquare(location, 'yellow');
};

// var fakeGameObject = {
//   snakes: [{
//     location: [[5,5],[4,5],[3,5],[3,6],[3,7]],
//     id: 2
//   },
//   { 
//     location: [[25,25],[24,25],[23,25],[23,26],[23,27]],
//     id: 0
//   }],
//   stars: [{
//     location: [40, 3]
//   },
//   {
//     location: [3, 29]
//   }]
// };

document.addEventListener('DOMContentLoaded', function(){
  
  var canvas = document.getElementsByClassName('gameBoard')[0];  
  window.myBoard = new Board(1000, 500, canvas);
  window.myBoard.updateBoard();
  socket.on('update', window.myBoard.updateBoard);
});
