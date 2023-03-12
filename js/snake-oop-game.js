/*
    Set the game board with rows = 20, cols = 20 and blockSize = 25.

    Onload of the HTML page prepare the game, add listeners and 
    finally start the game.
*/
var game = new Game(20, 20, 25, "board");

window.onload = function() {
    game.prepareActors();
    addListeners(game.direction);
    game.start();
}

// Add listeners to the page document --------------------------------------------

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