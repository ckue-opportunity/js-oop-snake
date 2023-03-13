class Snake {
    /**
     * Constructor.
     * 
     * @param {Board} board 
     */
    constructor(board) {
        this.board = board;
        this.x;
        this.y;

        this.initialize();
    }

    /**
     * Initializes the body array and places the snake's head.
     */
    initialize() {
        this.body = [];

        // set initial coordinates of the snake's head
        this.x = this.board.blockSize * 5;
        this.y = this.board.blockSize * 5;
    }

    /**
     * Draws the snake's body.
     */
    draw() {
        // set the fillStyle for the squares
        this.board.drawingContext.fillStyle = "lime";

        // draw the moved head first and then the rest of the snake's body
        this.drawSquare(this.x, this.y);

        for (let i = 0; i < this.body.length; i++) { // sample body = [[3, 5], [4, 5]]
            this.drawSquare(this.body[i][0], this.body[i][1]);
        }
    }

    /**
     * Draws a square at the indicated coordinates.
     * 
     * @param {int} x 
     * @param {int} y 
     */
    drawSquare(x, y) {
        this.board.drawingContext.fillRect(x, y, this.board.blockSize, this.board.blockSize);
    }

    /**
     * Checks if the head of the snake hits the food.
     * 
     * @param {*} food 
     * 
     * @returns {Boolean}
     */
    hit(food) {
        return this.x == food.x && this.y == food.y;
    }

    /**
     * Checks if the head of the snake hits itself.
     * 
     * @returns {Boolean}
     */
    hitItself() {
        if (!this.body.length) return false;

        for (let i = 0; i < this.body.length; i++) {
            if (this.x == this.body[i][0] && this.y == this.body[i][1]) {
                return true;
            } 
        }

        return false;
    }

    /**
     * Eats the given food by adding the coordinates of the food
     * to the tail of the snake.
     * 
     * @param {Food} food 
     */
    eat(food) {
        this.body.push([food.x, food.y]);
    }

    update(direction) {
        // shift the snake's body parts
        this.shift();

        // move the head of the snake towards the current direction
        this.moveHead(direction);
    
        // draw the snake
        this.draw();
    }

    /**
     * Shifts the snake's body coordinates towards the tail and the 
     * current tail coordinates are removed by this.
     * 
     * The current head coordinates of the snake are copied to the head 
     * of the body array.
     */
    shift() {
        if (!this.body.length) return; // Necessary if snake only has head coordinates.

        // loop backwards
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        }

        this.body[0] = [this.x, this.y];
    }

    /**
     * Moves the head of the snake.
     * 
     * @param {Direction} direction 
     */
    moveHead(direction) {
        this.x += direction.x * this.board.blockSize;
        this.y += direction.y * this.board.blockSize;
    }

    /**
     * Checks if the head of the snake has left the board.
     * 
     * @returns {Boolean}
     */
    leaveBoard() {
        if (this.x < 0 || this.x + 1 > this.board.cols * this.board.blockSize || 
            this.y < 0 || this.y + 1 > this.board.rows * this.board.blockSize) {
                return true;
            }
        else return false;
    }
}