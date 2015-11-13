(function (app) { 

  app.Board = function(width, height, canvas){

    this.canvas = canvas;
    this.pixels = 10;

    this.width = Math.floor(width / this.pixels);
    this.height = Math.floor(height / this.pixels);

    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);

    this.canvasContext = this.canvas.getContext('2d');
    this.snakeColors = ['red', 'blue', 'green', 'purple'];
    
    this.updateBoard();
  };

  app.Board.prototype.updateSquare = function(square, color){
    this.clearSquare(square);
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(square[0]*this.pixels, square[1]*this.pixels, this.pixels, this.pixels);
  };

  app.Board.prototype.clearSquare = function(square){
    this.canvasContext.fillStyle = "rgba(0,0,0,1)";
    this.canvasContext.fillRect(square[0]*this.pixels, square[1]*this.pixels, this.pixels, this.pixels);
  };

  app.Board.prototype.renderWalls = function(walls){
    for(var col = 0; col < this.width; col++){
      this.updateSquare([col, 0], 'pink');
      this.updateSquare([col, this.height-1], 'pink');
    }
    for(var row = 0; row < this.height; row++){
      this.updateSquare([0, row], 'pink');
      this.updateSquare([this.width-1, row], 'pink');
    }

    if(walls){
      for(var i = 0; i < walls.length; i++){
        this.updateSnake(walls[i], 'pink');
      }
    }
  };

  app.Board.prototype.initialRender = function(){
    for(var row = 0; row < this.height; row++){
      for(var col = 0; col < this.width; col++){
        if((row + col) % 2){
          this.updateSquare([col,row], 'grey');
        }
      }
    }
  };

  app.Board.prototype.updateSnake = function(snakeLocation, color){ 
    debugger;
    for(var i = 0; i < snakeLocation.length; i++){
      this.updateSquare(snakeLocation[i], color);
    }
  };

  app.Board.prototype.updateBoard = function(gameObject){
    console.log('board updated with ', gameObject);
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

  app.Board.prototype.updateStar = function(location){
    this.updateSquare(location, 'yellow');
  };

})(window.app);

