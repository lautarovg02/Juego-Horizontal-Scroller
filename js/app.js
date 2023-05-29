"use strict";

// * -----------------------------
// * The principal body of the proyect.
// * -----------------------------


// * -----------------------------
// * Variables for the game control.
// * -----------------------------
let gameCollectibles = [];
let currentCollectible = null;
let quantityCollections = 0;
let collisionDetectedWithEnemy = false;
let collisionDetectedWithCollectible = false;
let mainCharacter  = null;
let enemy = null;
const timeForEnemy = 3500;
let lifeStates = new Array();
let divCharacter = document.getElementById("character");
let sectionGameOver = document.getElementById("gameOver");
let sectionGame = document.getElementById("game");
let sectionMenu = document.getElementById("menu");
let btnPlay = document.getElementById("btn-play");
let btnMenu = document.getElementById("btn-menu");
let amountOfItemsCaptured = 0;

// * -----------------------------
// * Variable for user experience control.
// * -----------------------------
let in_game = false;
let quantityLifes = 6;
let lostLives = 0;
let didLifeChange = false;
let didPointChange = false;
let totalPoints = 0;
let points = document.createElement("p");

// * -----------------------------
// * Behaviour of buttons.
// * -----------------------------

btnPlay.addEventListener("click", () => {
    console.log("btnPlay");
    sectionMenu.classList.add("disguise");
    sectionGame.classList.remove("disguise");
});

btnMenu.addEventListener("click", () => {
    sectionMenu.classList.remove("disguise");
    sectionGameOver.classList.add("disguise");
})

// * -----------------------------
// * Behaviour of the keys.
// * -----------------------------
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "w") {
        mainCharacter.jumping();
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
    manipulatingPoints();
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
    if (!mainCharacter) {
        mainCharacter = new GentleMan ();
        mainCharacter.running();
        setInterval(generateEnemy, timeForEnemy);
        // setInterval(showCollectibles, currentCollectible.creationTime);//* Implements in the future
        setInterval(displayOnlyACollectible, 5000);
        setInterval(showPoints,1000)
    }
    in_game = true;
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of updating the variables and game objects.
 */
function updateStatus() {
    checkCollision();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of drawing the current stateof the game on the screen.
 */
function toRender() {
    if(collisionDetectedWithEnemy){
        if(lostLives < quantityLifes && !didLifeChange){
            lostLives++;
            if(lostLives == quantityLifes-1){
                gameOver();
            }
            manipulateLives(lostLives);
        }
        
    }
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of checking if two objects collide.
 */
function checkCollision() {
    let a = mainCharacter.status();

    let a_pos = {
        t: a.top - 20,
        l: a.left,
        r: a.left + a.width - 95,
        b: a.top + a.height - 90,
    };

    if (enemy) {
        let b = enemy.status();
        let b_pos = {
            t: b.top,
            l: b.left,
            r: b.left + b.width - 101,
            b: b.top + b.height - 101,
        };
        if (!(a_pos.r + 3 < b_pos.l || a_pos.l > b_pos.r || a_pos.b < b_pos.t ||a_pos.t > b_pos.b) ) {
            collisionDetectedWithEnemy = true;
            amountOfItemsCaptured++;
            didPointChange = false;
        }
        else{
            collisionDetectedWithEnemy = false;
            didLifeChange = false;
        }
    }
    
    if(currentCollectible){
        let c = currentCollectible.status();
        let c_pos = {
            t: c.top,
            l: c.left,
            r: c.left + c.width - 12,
            b: c.top + c.height -12,
        };
        if (!(a_pos.r < c_pos.l || a_pos.l > c_pos.r || a_pos.b < c_pos.t ||a_pos.t > c_pos.b) ) {
            collisionDetectedWithCollectible = true;
            didPointChange = false;
        }else{
            collisionDetectedWithCollectible = false;
        }
    }

}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description function in charge of generating enemies
 */
function generateEnemy() {
    enemy = null;
    enemy = new Enemys();
    enemy.walking();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function fill an array with collectibles from the game.
 */
function generateCollectibles(){
    let goldIngot = new Collectibles("goldIngot",500,6000);
    let silverIngot = new Collectibles("silverIngot",250,3000);
    let chest = new Collectibles("chest",1000,10000);
    gameCollectibles.push(goldIngot,silverIngot,chest);
    quantityCollections = gameCollectibles.length;
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function selects and displays a collectible.
 */
function displayOnlyACollectible(){
    let collectibleRandom = Math.floor(Math.random() * quantityCollections);
    currentCollectible = gameCollectibles[collectibleRandom];
    currentCollectible.showCollectableType(currentCollectible.name);
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function updates and displays the points.
 */
function showPoints() {
    let containerPoints = document.querySelector(".points");
    points.innerHTML = "Puntos: " + totalPoints;
    containerPoints.appendChild(points);
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
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
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This functions handles the points system.
 */
function manipulatingPoints() {
    
    if(collisionDetectedWithEnemy){
        console.log("puntos antes " + totalPoints);
        totalPoints = totalPoints - 500;
        if(totalPoints < 0 ){
            totalPoints = 0;
        }
        console.log("puntos despues " + totalPoints);
    }else if(collisionDetectedWithCollectible && !didPointChange){
        totalPoints = totalPoints + currentCollectible.revenue;
        currentCollectible.clean(); //* when the character picks up the collectible we delete it
        collisionDetectedWithCollectible = false;
        didPointChange = true;
    }
    totalPoints += 1;
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function updates the state of the lives.
 */
function manipulateLives(life) {
    if(life < quantityLifes){
        let containerLife = document.querySelector(".life");
        let src = lifeStates[life].src;
        containerLife.style.background = "url(" + src + ") no-repeat";
        containerLife.style.backgroundSize = "200px 100px";
        collisionDetectedWithEnemy = false;
        didLifeChange = true;
    }
}

function gameOver(){
    sectionGameOver.classList.remove("disguise");
    sectionGame.classList.add("disguise");
    sectionMenu.classList.add("disguise");

    let listStats = document.getElementById("list-stats");
    listStats.innerHTML = '<li class="list-group-item" >Puntos Totales: ' + totalPoints +'</li>';
    listStats.innerHTML += '<li class="list-group-item" >Cantidad de items atrapados: ' + amountOfItemsCaptured +'</li>';
}   

// * -----------------------------
// * The principal entrance of the project.
// * -----------------------------
fillMatrixOfLives();
manipulateLives(0);
generateCollectibles();
gameLoop();
