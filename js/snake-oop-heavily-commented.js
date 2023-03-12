// board with rows = 20, cols = 20 and blockSize 25
var board;
/* var blockSize = 25;
var rows = 20;
var cols = 20; */
// drawing context
// var drawingContext;

// food
var food;

// snake
var snake;

// snake head
/* var snakeX = blockSize * 5;
var snakeY = blockSize * 5; */

// direction
var direction;
/* var velocityX = 0;
var velocityY = 0; */

// var snakeBody = []

// var foodX;
// var foodY;

var gameOver = false;



window.onload = function() {
    // prepare board with rows = 20, cols = 20 and blockSize 25
    board = new Board(20, 20, 25, "board");
    /* board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // used for drawing on board */
    
    // prepare the food bit
    food = new Food(board);

    // prepare the snake
    snake = new Snake(board);

    // prepare direction object
    direction = new Direction();

    // add listeners for keyup and clicks on arrow button events
    addListeners(direction);
    // document.addEventListener("keyup", changeDirection);

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
    if (gameOver) {
        return;
    }

    // draw empty board
    board.draw();
    /* context.fillStyle = "black";
    context.fillRect(0, 0,board.width, board.height); */

    // draw food
    food.draw();
    /* context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize); */

    // check if snake hits the food ...
    // if(snakeX == foodX && snakeY == foodY)
    if (snake.hit(food)) {
        // ... and add the food to the the tail of the snake
        snake.eat(food);
        // snakeBody.push([food.x, food.y])

        // place more food, but do not draw it yet
        food.place();
        // placeFood();
    }

    // shift the snake's body parts
    snake.shift();
    /* for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        // set the head part of the snake to the current snakeX, snakeY
        snakeBody[0] = [snakeX, snakeY];
    } */

    // move the head of the snake in the current direction
    snake.moveHead(direction);
    /* snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize; */

    // draw the snake
    snake.draw();
    /* drawingContext.fillStyle = "lime";
    drawingContext.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(i = 0; i < snakeBody.length; i++) {
        drawingContext.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    } */

    // check gameover condition 1: snake leaves board
    // if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize)
    if (snake.leaveBoard()) {
        quitGame();
        /* gameOver = true;
        alert("Game Over");
        // confirm("Press Restart");
        location.reload(); */
    }

    // check gameover condition 2: snake hits itself (goes backwards hitting itself)
    if (snake.hitItself()) {
        quitGame();
        /* gameOver = true;
        alert("Game Over");
        // confirm("Press Restart");
        location.reload(); */
    }
    /* for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            // confirm("Press Restart");
            location.reload();
        } 
    } */

}


/* function changeDirection(e) {
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
} */

function quitGame() {
    gameOver = true;
    alert("Game Over");
    /* confirm("Press Restart"); */
    location.reload();
}

function addListeners(direction) {
    addKeyupListener(direction);
    addButtonClickListeners(direction);
}

function addKeyupListener(direction) {
    document.addEventListener("keyup", function(e) {
        direction.change(e);
    });
}

function addButtonClickListeners(direction) {
    document.getElementById("upBtn").addEventListener("click", function() {
        direction.change({code: "ArrowUp"});
    });
    
    document.getElementById("downBtn").addEventListener("click", function() {
        direction.change({code: "ArrowDown"});
    });
    
    document.getElementById("leftBtn").addEventListener("click", function() {
        direction.change({code: "ArrowLeft"});
    });
    
    document.getElementById("rightBtn").addEventListener("click", function() {
        direction.change({code: "ArrowRight"});
    });
}

/* var upBtn = document.getElementById("upBtn");
upBtn.addEventListener("click", function() {
    direction.change({ code: "ArrowUp" });
    // changeDirection({ code: "ArrowUp" });
});

var downBtn = document.getElementById("downBtn");
downBtn.addEventListener("click", function() {
    direction.change({ code: "ArrowDown" });
});

var leftBtn = document.getElementById("leftBtn");
leftBtn.addEventListener("click", function() {
    direction.change({ code: "ArrowLeft" });
});

var rightBtn = document.getElementById("rightBtn");
rightBtn.addEventListener("click", function() {
    direction.change({ code: "ArrowRight" });
}); */



// (0 - 1) * cols -> (0 - 19.9999) -> (0-19) *25
/* function placeFood() {
    foodX  = Math.floor(Math.random() * cols) * blockSize;
    foodY  = Math.floor(Math.random() * rows) * blockSize;
} */



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