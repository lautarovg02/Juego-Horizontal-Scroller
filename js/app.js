"use strict";

// * -----------------------------
// * The principal body of the proyect.
// * -----------------------------
let gentleman = null;
let enemy = null;
const timeForEnemy = 3500;
let quantityLifes = 6;
let lostLives = 0;
let lifeStates = new Array();
let divCharacter = document.getElementById("character");
let didLifeChange = false;
let collisionDetected = false;
let in_game = false;

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
 * @autor Lautaro Gallo https://github.com/lautarovg02
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

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of starting the characters.
 */
function processUserInput() {
    if (!gentleman) {
        gentleman = new GentleMan();
        gentleman.running();
        setInterval(generateEnemy, timeForEnemy);
    }
    in_game = true;
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of updating the variables and game objects.
 */
function updateStatus() {
    let divEnemy = document.querySelector(".enemy");
    if (enemy && divEnemy) {
        checkCollision();
    }
    
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of drawing the current stateof the game on the screen.
 */
function toRender() {
    if(collisionDetected){
        if(lostLives < quantityLifes && !didLifeChange){
            lostLives++;
            console.log("lost lives " + lostLives);
            manipulateLives(lostLives);
        }
    }
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of checking if two objects collide.
 */
function checkCollision() {
    let a = gentleman.status();
    let b = enemy.status();
    let a_pos = {
        t: a.top,
        l: a.left,
        r: a.left + a.width - 95,
        b: a.top + a.height - 90,
    };
    let b_pos = {
        t: b.top,
        l: b.left,
        r: b.left + b.width - 95,
        b: b.top + b.height - 90,
    };
    if (!(a_pos.r < b_pos.l || a_pos.l > b_pos.r || a_pos.b < b_pos.t ||a_pos.t > b_pos.b)) {
        collisionDetected = true;
    }else{
        collisionDetected = false;
        didLifeChange = false;
    }
}

/**
 * @autor lautarovg02
 * @description function in charge of generating enemies
 */
function generateEnemy() {
    enemy = null;
    enemy = new Enemy();
    enemy.walking();
}


/**
 * @autor lautarovg02
 * @description Function in charge of filling the matrix of lives.
 */
function fillMatrixOfLives(){
    for (let index = 0; index < quantityLifes; index++) {
        lifeStates[index] = new Image();
    }
    lifeStates[0].src = "/img/lifeProgress/life-stage-1.png";
    lifeStates[1].src = "/img/lifeProgress/life-stage-2.png";
    lifeStates[2].src = "/img/lifeProgress/life-stage-3.png";
    lifeStates[3].src = "/img/lifeProgress/life-stage-4.png";
    lifeStates[4].src = "/img/lifeProgress/life-stage-5.png";
    lifeStates[5].src = "/img/lifeProgress/life-stage-6.png";
}

/**
 * @autor lautarovg02
 * @description This function updates the state of the lives.
 */
function manipulateLives(life) {
    if(life < quantityLifes){
        let containerLife = document.querySelector(".life");
        let src = lifeStates[life].src;
        containerLife.style.background = "url(" + src + ") no-repeat";
        containerLife.style.backgroundSize = "200px 100px";
        collisionDetected = false;
        didLifeChange = true;
    }
}

// * -----------------------------
// * The principal entrance of the project.
// * -----------------------------
fillMatrixOfLives();
manipulateLives(0);
gameLoop();
