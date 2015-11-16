(function (app) { 

  //Board constructor initializes a board based on width and height in pixels. Needs a reference to the DOMs canvas element.
  app.Board = function(width, height, canvas){

    this.canvas = canvas;
    //pixels defines the number of pixels along each side of a game square.  Changing this parameter will break the game
    //as written.
    this.pixels = 10;

    this.width = Math.floor(width / this.pixels);
    this.height = Math.floor(height / this.pixels);

    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);

    //most rendering on a canvas element are performed on its context
    this.canvasContext = this.canvas.getContext('2d');
    this.snakeColors = ['red', 'blue', 'green', 'purple'];
    
    //Clear the current board
    this.updateBoard();
  };

  //Board.updateSquare: given a location tuple and a color, fill that square in.
  app.Board.prototype.updateSquare = function(square, color){
    this.clearSquare(square);
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(square[0]*this.pixels, square[1]*this.pixels, this.pixels, this.pixels);
  };
  
  //Board.clearSquare: clear a square
  app.Board.prototype.clearSquare = function(square){
    this.canvasContext.fillStyle = "rgba(0,0,0,1)"; //an empty square is translucent black
    this.canvasContext.fillRect(square[0]*this.pixels, square[1]*this.pixels, this.pixels, this.pixels);
  };

  //Given a array of tuples and a color, paint those locations
  app.Board.prototype.updateSnake = function(snakeLocation, color){ 
    for(var i = 0; i < snakeLocation.length; i++){
      this.updateSquare(snakeLocation[i], color);
    }
  };
  
  //render the current game object
  app.Board.prototype.updateBoard = function(gameObject){
    this.canvasContext.clearRect(0,0, this.width*this.pixels, this.height*this.pixels);

    if(gameObject){
      //draw snakes
      gameObject.snakes.forEach(function(snake){
        this.updateSnake(snake.location, this.snakeColors[snake.id]);  
      }, this);
      
      if(gameObject.items){
        //draw items.  Currently only stars are supported.
        gameObject.items.forEach(function(item){
          if(item.type === 'star'){
            this.updateItem(item.location, 'yellow');
          } 
        }, this);
      }
    }
  };

  //draw an item
  app.Board.prototype.updateItem = function(location, color){
    this.updateSquare(location, color);
  };

})(window.app);

