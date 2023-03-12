class Board {
    /**
     * Create and prepare the board.
     * 
     * The board depends on a HTML element. This constructor 
     * must be called on window.onload.
     * 
     * @param {int} rows 
     * @param {int} cols 
     * @param {int} blockSize 
     * @param {String} canvasElementId 
     */
    constructor(rows, cols, blockSize, canvasElementId) {
      this.rows = rows;
      this.cols = cols;
      this.blockSize = blockSize;
      this.canvasElementId = canvasElementId;
      this.canvasElement; // was called "board" before
      this.drawingContext;

      // Prepare the canvas element and the 2d-context.
      this.prepare();
    }

    /**
     * Prepare the canvas and get the 2d-context.
     * 
     * This function depends on a HTML element and
     * must be called with window.onload.
     */
    prepare() {
        this.canvasElement = document.getElementById(this.canvasElementId);
        this.canvasElement.height = this.rows * this.blockSize;
        this.canvasElement.width = this.cols * this.blockSize;
        this.drawingContext = this.canvasElement.getContext("2d");
    }

    /**
     * Draw the board.
     */
    draw() {
        this.drawingContext.fillStyle = "black";
        this.drawingContext.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

}