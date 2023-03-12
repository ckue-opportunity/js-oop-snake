// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var drawingContext;

// snake head

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = []

var foodX;
var foodY;

var gameOver = false;



window.onload = function() {
    // prepare board and get 2d-context
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    drawingContext = board.getContext("2d"); // used for drawing on board

    placeFood(); // ... but do not draw it yet

    // add listener for keyup events
    document.addEventListener("keyup", changeDirection);

    // start updating the situation on the board
    /*
        TODO: Make the update frequency configurable.
              This could be done by a range slider that
              allows to select a game level: The higher
              the level, the higher the update frequency -
              the harder the game.
    */
    setInterval(update, 1000/2);
}

function update() {
    if(gameOver) {
        return;
    }

    // draw board
    drawingContext.fillStyle = "black";
    drawingContext.fillRect(0, 0,board.width, board.height);

    // draw food
    drawingContext.fillStyle = "red";
    drawingContext.fillRect(foodX, foodY, blockSize, blockSize);

    // check if snake hits the food ...
    if(snakeX == foodX && snakeY == foodY) {
        // ... and add the food to the the tail of the snake
        snakeBody.push([foodX, foodY])
        placeFood(); // place food, but do not draw it yet
    }

    // backwards: shift the snake's body parts towards the tail
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        // set the head part of the snake to the current snakeX, snakeY
        snakeBody[0] = [snakeX, snakeY];
    }

    // draw the snake
    drawingContext.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    drawingContext.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(i = 0; i < snakeBody.length; i++) {
        drawingContext.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // check gameover condition 1: snake leaves board
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
        /* confirm("Press Restart"); */
        location.reload();
    }

    // check gameover condition 2: snake hits itself (goes backwards hitting itself)
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            /* confirm("Press Restart"); */
            location.reload();
        } 
    }

}


/*  */

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        // upwards
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1) {
        // downwards
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1) {
        // to the left
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code == "ArrowRight" && velocityX != -1) {
        // to the right
        velocityX = 1;
        velocityY = 0;
    }
}

var upBtn = document.getElementById("upBtn");
upBtn.addEventListener("click", function() {
    changeDirection({ code: "ArrowUp" });
});

var downBtn = document.getElementById("downBtn");
downBtn.addEventListener("click", function() {
    changeDirection({ code: "ArrowDown" });
});

var leftBtn = document.getElementById("leftBtn");
leftBtn.addEventListener("click", function() {
    changeDirection({ code: "ArrowLeft" });
});

var rightBtn = document.getElementById("rightBtn");
rightBtn.addEventListener("click", function() {
    changeDirection({ code: "ArrowRight" });
});



// (0 - 1) * cols -> (0 - 19.9999) -> (0-19) *25
function placeFood() {
    foodX  = Math.floor(Math.random() * cols) * blockSize;
    foodY  = Math.floor(Math.random() * rows) * blockSize;
}



// ----------------------------------------------------------------
/* document.getElementById("upButton").addEventListener("touchstart", function(event) {
    event.preventDefault(); // prevent scrolling
    var id = event.target.id;
    if (id === "upButton") {
        ArrowUp();
      
    }
     
  });

  document.getElementById("downButton").addEventListener("touchstart", function(event) {
    event.preventDefault(); // prevent scrolling
    var id = event.target.id;
    
     if (id === "downButton") {
        ArrowDown();
   

    }
     
  });
  
  document.getElementById("leftButton").addEventListener("touchstart", function(event) {
    event.preventDefault(); // prevent scrolling
    var id = event.target.id;
    if (id === "leftButton") {
        ArrowLeft();
      
    }
      
  });

  document.getElementById("upButton").addEventListener("touchstart", function(event) {
    event.preventDefault(); // prevent scrolling
    var id = event.target.id;
    if  (id === "rightButton") {
        ArrowRight();
    
      }

  }); */