"use strict";
// * -----------------------------
// * The principal body of the proyect.
// * -----------------------------
let in_game = false;
let gentleman = null;
let enemy = null;


// * -----------------------------
// * Behaviour of the keys.
// * -----------------------------
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "w") {
        gentleman.jumping();
    }
});


// * -----------------------------
// * Behaviour of the functions.
// * -----------------------------

/**
 * 
 * @description Function in charge of checking the status of the character and enemies.
 */
function gameLoop() {
    processUserInput();
    updateStatus();
    toRender();

    if (in_game) {
        requestAnimationFrame(gameLoop);
    }
}

function processUserInput() {
    if(!gentleman) {
        gentleman = new GentleMan();
        gentleman.running();
    }
    in_game = true;
}

function updateStatus() {
}
function toRender() {}


function generateEnemy() {
    enemy = null;
    enemy = new Enemy();
    enemy.walking();
}

gameLoop();
setInterval(generateEnemy, 3500);
