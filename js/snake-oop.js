// board with rows = 20, cols = 20 and blockSize 25
var board = new Board(20, 20, 25, "board");
var food;
var snake;
var direction;

var gameOver = false;



window.onload = function() {
    // prepare board
    board.prepare();
    
    // prepare food and place it but do not draw it yet
    food = new Food(board);

    // prepare snake
    snake = new Snake(board);

    // prepare direction object
    direction = new Direction();

    // add listeners for keyup and clicks on arrow button events
    addListeners(direction);
    
    // start updating the game situation
    setInterval(update, 1000/2);
}

function update() {
    if (gameOver) {
        return;
    }

    // draw empty board
    board.draw();

    // draw food
    food.draw();

    // check if snake hits the food ...
    if (snake.hit(food)) {
        // ... and add the food to the the tail of the snake
        snake.eat(food);

        // place more food, but do not draw it yet
        food.place();
    }

    // shift the snake's body parts
    snake.shift();

    // move the head of the snake in the current direction
    snake.moveHead(direction);

    // draw the snake
    snake.draw();

    // check gameover condition 1: snake leaves board
    if (snake.leaveBoard()) {
        quitGame();
    }

    // check gameover condition 2: snake hits itself (goes backwards hitting itself)
    if (snake.hitItself()) {
        quitGame();
    }
}

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
