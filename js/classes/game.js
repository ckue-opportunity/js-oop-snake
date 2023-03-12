class Game {
    constructor(rows, cols, blockSize, canvasElementId) {
        // board dimensions
        this.rows = rows;
        this.cols = cols;
        this.blockSize = blockSize;
        this.canvasElementId = canvasElementId;

        // actors
        this.board;
        this.food;
        this.snake;

        // snake's movement direction
        this.direction;

        // timer interval
        this.intervalId;
        this.fps = 2; // frames per second
    }

    /**
     * Prepare the actors of the game.
     * 
     * Caution: This method must be called when the related HTML page
     *          was loaded. It depends on a canvas element.
     * 
     * @param {Boolean} restart 
     */
    prepareActors(restart) {
        if (!restart) {
            this.board = new Board(this.rows, this.cols, this.blockSize, this.canvasElementId);
            this.food = new Food(this.board);
            this.snake = new Snake(this.board);
            this.direction = new Direction();
        }
        else {
            this.food.place();
            this.snake.initialize();
            this.direction.initialize();
        }

        this.update();
        this.start();
    }

    /** 
     * Start the game.
     */
    start() {
        this.startInterval();
    }

    /**
     * Stop the game.
     */
    stop() {
        this.stopInterval();

        // Alert and restart another game.
        alert("Game Over");
        this.prepareActors(true); // Restart, keeping the current board.
        // location.reload();
    }

    /**
     * Starts the interval that updates the actors on the board.
     */
    startInterval() {
        // If necessary stop existing interval.
        this.stopInterval();

        // For scope reasons, bind 'this' into a block variable.
        let game = this;

        this.intervalId = setInterval(function() {
                game.update();
            }, 
            1000 / this.fps
        );
    }

    /**
     * Stops the current interval and with it the update of
     * the game actors.
     */
    stopInterval() {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    /**
     * Updates the actors on the board.
     */
    update() {
        this.board.draw();
        this.food.draw();
    
        if (this.snake.hit(this.food)) {
            this.snake.eat(this.food);
    
            // place more food for the next update, but do not draw it yet
            this.food.place();
        }

        this.snake.update(this.direction);
    
        // Check if the game is over.
        if (this.snake.leaveBoard() || this.snake.hitItself()) {
            this.stop();
        }
    }
}