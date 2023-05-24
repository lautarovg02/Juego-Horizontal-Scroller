"use strict";
// * -----------------------------
// * The principal body of the proyect.
// * -----------------------------
let in_game = false;
let gentleman = null;
let enemy = null;
let divCharacter = document.getElementById("character");
const timeForEnemy = 3500;


// * -----------------------------
// * Behaviour of the keys.
// * -----------------------------
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "w") {
        gentleman.jumping();
    }
    // else if (event.key === "ArrowDown" || event.key === "s") {
    //     gentleman.crouching();
    // }
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
        setInterval(generateEnemy, timeForEnemy);
    }
    in_game = true;
}

function updateStatus() {
    let divEnemy = document.querySelector(".enemy");
    if(enemy && divEnemy ){
        checkCollision();
    }
}
function toRender() {}

function checkCollision() {
    // const rect1 = divCharacter.getBoundingClientRect();
    // const rect2 = document.querySelector(".enemy").getBoundingClientRect();
    let a = gentleman.status();
    let b = enemy.status();
    let a_pos = {
        t: a.top,
        l: a.left,
        r: a.left + a.width - 95,
        b: a.top + a.height - 90
    };
    let b_pos = {
        t: b.top,
        l: b.left,
        r: b.left + b.width - 95,
        b: b.top + b.height - 90
    };
    if (!(a_pos.r < b_pos.l ||
        a_pos.l  > b_pos.r ||
        a_pos.b  < b_pos.t ||
        a_pos.t  > b_pos.b)) {
        console.log("Colicion detected");
    }
}


function generateEnemy() {
    enemy = null;
    enemy = new Enemy();
    enemy.walking();
}

gameLoop();

