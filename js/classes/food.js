class Food {
    constructor(board) {
        this.board = board;
        this.x;
        this.y;

        // Initialize by placing the food bit.
        this.place();
    }

    /**
     * Places the bit of food randomly on the board.
     */
    place() {
        this.x  = Math.floor(Math.random() * this.board.cols) * this.board.blockSize;
        this.y  = Math.floor(Math.random() * this.board.rows) * this.board.blockSize;
    }

    /**
     * Draws the the bit of food at the current coordinates.
     */
    draw() {
        this.board.drawingContext.fillStyle = "red";
        this.board.drawingContext.fillRect(this.x, this.y, this.board.blockSize, this.board.blockSize);
    }
}