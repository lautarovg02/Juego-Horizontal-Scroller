"use strict";
// * -----------------------------
// * Time control to generate objects.
// * -----------------------------
const minimumTimeToSpawnEnemy = 3500;
const maximumTimeToSpawnEnemy = 7000;
let gameTime;
let interval;
let intervalGame;
let intervalItemGold;
let intervalItemLive;
let timeItemGold = 3000;
let timeItemLives = 10000;
let timeEnemy = 5000;
const MAX_ENEMYS = 10;

// * -----------------------------
// * Constants for game audio
// * -----------------------------
const MENU_SOUND = new Music("/music/menuSound.mp3");
const GAME_SOUND = new Music("/music/gameSound.mp3");
const THUMPING_SOUND = new Music("/music/thumpingSound.mp3");
const SOUND_COLLECTING = new Music("/music/soundOfCollecting.mp3");
const LOSER_SOUND = new Music("/music/loserSound.mp3");

let soundOn = false;
let soundOff = false;

// * -----------------------------
// * Flags for an element to inreact only once.
// * -----------------------------
let flagCollisonGold = false;
let flagCollisionLive = false;
let flagCollisionEnemy = false;

// * -----------------------------
// * Variables for the Collectibles.
// * -----------------------------
let quantityCollections;
let lifeStates = new Array();
let goldItems = [];
let chosenGoldItem = null;
let livesItems = [];
let livesItemChose = null;

// * -----------------------------
// * Variables for the Main Character.
// * -----------------------------
let quantityLifes = 6;
let lostLives = 0;
let collisonGold = false;
let collisionLives = false;
let mainCharacter = null;
let amountOfItemsCaptured = 0;
let totalPoints = 0;

// * -----------------------------
// * Variables for the Enemy.
// * -----------------------------
let enemy = null;
let enemyDamage = 100;
let in_game = false;
let collisionDetectedWithEnemy = false;
let intervalDeleteEnemy;
let intervalChequearColisionEnemigo;

// * -----------------------------
// * Html elements.
// * -----------------------------
let sectionGameOver = document.getElementById("gameOver");
let sectionGame = document.getElementById("game");
let sectionMenu = document.getElementById("menu");
let divGameTime = document.querySelector(".gameDuration");
let divContainerGame = document.querySelector(".containerGame");
let divCharacter = document.getElementById("character");
let points = document.createElement("p");
let containerPoints = document.querySelector(".points");

// * -----------------------------
// * Buttons.
// * -----------------------------
let btnPlay = document.getElementById("btn-play");
let btnPlayAgain = document.getElementById("btn-volverAjugar");
let btnSoundOff = document.getElementById('btn-sound-off');
let btnSoundOn = document.getElementById('btn-sound-on');

// * -----------------------------
// * Behaviour of buttons.
// * -----------------------------
btnSoundOn.addEventListener("click",activeMenuSound);
btnSoundOff.addEventListener("click",desactivateMenuSound);
btnPlay.addEventListener("click", startGame);
btnPlayAgain.addEventListener("click",restartGame)

// * -----------------------------
// * Behaviour of the keys.
// * -----------------------------
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        mainCharacter.jumping();
    }
});

// * -----------------------------
// * Behaviour of the functions.
// * -----------------------------
/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description function in charge of handling the logic when the user starts the game.
 */
function startGame() {
    gameTime = 120000;
    intervalGame =  setInterval(() =>{
        updateTime();
    }, 1000);
    fillMatrixOfLives();
    generateCollectibles();
    in_game = true;
    interval = setInterval(() => { 
        generateMonster()
    }, timeEnemy);

    intervalDeleteEnemy = setInterval(deleteEnemys, 50);

    intervalChequearColisionEnemigo = setInterval(checkCollisionEnemys,50);

    showGame();
    gameLoop();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of resetting its value to its original state
 */
function restartGame(){
    timeEnemy = 5000;
    intervalGame =  setInterval(() =>{
        updateTime();
    }, 1000);
    interval = setInterval(() => { 
        generateMonster()
    }, timeEnemy);
    intervalDeleteEnemy = setInterval(deleteEnemys, 50);
    intervalChequearColisionEnemigo = setInterval(checkCollisionEnemys,50);
    //* Removing old items
    deleteItems();
    deleteEnemys();
    //* Resseting objects
    mainCharacter = null;
    enemy = null;
    livesItemChose = null;
    chosenGoldItem = null;

    //* Resetting flags
    flagCollisonGold = false;
    flagCollisionLive = false; 
    flagCollisionEnemy = false;
    soundOn = false;

    //* Resseting collisions 
    collisonGold = false;
    collisionLives = false;
    collisionDetectedWithEnemy = false;

    //* Resseting arrays 
    goldItems = [];
    livesItems = [];
    //* Resseting counter variables 
    amountOfItemsCaptured = 0;  //* reset cant itms capturados
    lostLives = 0;  //* reset lost Lives
    totalPoints = 0;//* reset lost LivestotalPoints
    quantityCollections = 0;//* reset 
    quantityLifes = 6;

    if(enemy){
        divContainerGame.removeChild(enemy.getNode());
    }

    gameTime = 120000;//* reset 
    in_game = true;
    showGame();
    fillMatrixOfLives();
    generateCollectibles();
    gameLoop();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of handling the logic when the user loses
 */
function gameOver(){
    clearInterval(intervalItemLive);
    clearInterval(intervalItemGold);
    clearInterval(intervalDeleteEnemy);
    clearInterval(intervalChequearColisionEnemigo);
    clearInterval(interval);
    clearInterval(intervalGame);
    showGameOver();
    in_game = false;
    let listStats = document.getElementById("list-stats");
    listStats.innerHTML = '<li class="list-group-item" >Puntos Totales: ' + totalPoints +'</li>';
    listStats.innerHTML += '<li class="list-group-item" >Cantidad de items atrapados: ' + amountOfItemsCaptured +'</li>';
}  

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of showing the scenario when the user loses
 */
function showGameOver() {
    if(soundOn){
        GAME_SOUND.stop();
        MENU_SOUND.play();
        LOSER_SOUND.play();
        sectionGame.appendChild(LOSER_SOUND.audio);
    }
    sectionGameOver.classList.remove("disguise");
    sectionGame.classList.add("disguise");
    document.getElementById("menu").classList.add("disguise");
}
/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of displaying the scenario when the user starts the game
 */
function showGame(){
    if(soundOn){
        GAME_SOUND.play();
        MENU_SOUND.stop();
        sectionGame.appendChild(GAME_SOUND.audio);
    }
    sectionGameOver.classList.add("disguise");
    sectionGame.classList.remove("disguise");
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of checking the status of the character and enemies.
 */
function gameLoop() {
    processUserInput();
    checkCollisionEnemys();
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
    if (!mainCharacter) {
        mainCharacter = new GentleMan ();
        mainCharacter.running();
        intervalItemGold = setInterval(() =>{
            getRandomItemGold();
        }, timeItemGold);
        intervalItemLive = setInterval(() =>{
            getRandomItemLives();
        }, timeItemLives);
    } 
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of obtaining a random object from the array of gold items
 */
function getRandomItemGold(){
    let itemGoldRandom = Math.floor(Math.random() *goldItems.length);
    chosenGoldItem = null;
    chosenGoldItem = goldItems[itemGoldRandom];
    flagCollisonGold = false;
    timeItemGold = chosenGoldItem.getTimeGeneration();
    chosenGoldItem.showCollectableType();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description function in charge of obtaining a random object from the array of lives items
 */
function getRandomItemLives(){
    let itemRandom = Math.floor(Math.random() *livesItems.length);
    livesItemChose = livesItems[itemRandom];
    flagCollisionLive = false;
    livesItemChose.showCollectableType();
    timeItemLives = livesItemChose.getTimeGeneration();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description The objective of this function is to subtract one second from the time variable and update it.
 */
function updateTime() {
    gameTime = gameTime - 1000;
    divGameTime.innerHTML = "Tiempo Restante: " + Math.floor(gameTime / 1000);
    if (gameTime <= 0) {
        clearInterval(intervalGame);
        gameOver();
    }
}

function checkCollisionEnemys() {
    let statusCharacter = mainCharacter.status()
    let enemys  = document.querySelectorAll(".enemy");
    enemys.forEach(element => {
        if(element != null ){
            let statusEnemy = element.getBoundingClientRect();
            if(
                statusCharacter.right-120 > statusEnemy.left+100 &&
                statusCharacter.left-120 < statusEnemy.right+90 &&
                statusCharacter.top-80 < statusEnemy.bottom+50 &&
                statusCharacter.bottom-69 > statusEnemy.top+60
                )
            {
                flagCollisionEnemy = true;
                removeLives();
                removePoints();
                element.remove();
            }
            flagCollisionEnemy = false;
        }
    }); 
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of updating the variables and game objects.
 */
function updateStatus() {
    if(chosenGoldItem && !collisonGold ){
        collisonGold = chosenGoldItem.checkCollision(mainCharacter);
    }
    if(livesItemChose && !flagCollisionLive){
        collisionLives = livesItemChose.checkCollision(mainCharacter);
    }
    if(collisionLives){     
        if(!flagCollisionLive){
            addLives();
            amountOfItemsCaptured++;
        }
        flagCollisionLive = true;
        collisionLives = false;
    }
    if (collisonGold) {
        if(!flagCollisonGold){
            addPoints();
        }
        flagCollisonGold = true;
        collisonGold = false;
    }
    if (in_game) {
        totalPoints++;
    }
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of adding points to the user.
 */
function addPoints(){
    if(collisonGold){
        if(soundOn){
            soundItem();
        }
        amountOfItemsCaptured++;
        let pointsAdditional = chosenGoldItem.getGold();
        totalPoints = totalPoints + pointsAdditional;
        chosenGoldItem.clean(); //* when the character picks up the collectible we delete it
    }
    showPoints();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of removing points to the user.
 */
function removePoints(){
    if(flagCollisionEnemy){
        if(totalPoints < enemyDamage ){
            gameOver();
        }else{
            totalPoints = totalPoints - enemyDamage;
        }
    }
    showPoints();
}
const thumpingSound  = () => {
    if(soundOn ){
        sectionGame.appendChild(THUMPING_SOUND.audio);
        THUMPING_SOUND.play()
    }
}

const soundItem = () => {
    if(soundOn){
        sectionGame.appendChild(SOUND_COLLECTING.audio);
        SOUND_COLLECTING.play()
        sectionGame.addEventListener("ended", () => {
            SOUND_COLLECTING.stop();
            SOUND_COLLECTING.remove();
        });
    }
}
/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of adding  to the user.
 */
function addLives(){
    if(!flagCollisionLive){
        if(soundOn){
            soundItem();
        }
        let lives = livesItemChose.getLives();
        if(lostLives != 0) {
            lostLives = lostLives - lives;
            if(lostLives < 0){
                lostLives = 0;
            }
            let containerLife = document.querySelector(".life");
            let src = lifeStates[lostLives].src;
            containerLife.style.background = "url(" + src + ") no-repeat";
            containerLife.style.backgroundSize = "200px 100px";
        }
        livesItemChose.clean();
    }
}



/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of removing  to the user.
 */
function removeLives(){
    if(flagCollisionEnemy){
        if(lostLives < quantityLifes){
            lostLives++;
            if(lostLives == quantityLifes-1){

                gameOver();
            }
            if(soundOn){
                thumpingSound();
            }
            if(lostLives < 0){
                lostLives = 0;
            }
            let containerLife = document.querySelector(".life");
            let src = lifeStates[lostLives].src;
            containerLife.style.background = "url(" + src + ") no-repeat";
            containerLife.style.backgroundSize = "200px 100px";
        }
    }
}
/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of drawing the current stateof the game on the screen.
 */
function toRender() {
    showPoints();
}
/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description function in charge of generating enemies
 */
function generateMonster() {
        clearInterval(interval);
        interval = setInterval(() =>{
            generateMonster();
        },timeEnemy);

        timeEnemy = getRandomTime(minimumTimeToSpawnEnemy,maximumTimeToSpawnEnemy);
        let velocity;

        if(gameTime > 30000){
            velocity =  Math.random(5 - 2) + 2;// getRandomTime
        }else{
            velocity =  Math.random(5 - 1) + 1;
        }
        flagCollisionEnemy = false;
        enemy = new Monster(velocity);
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description Function in charge of eliminating the enemies from the screen, once they have finished their journey.
 */
function deleteEnemys() {    
    let allEnemys = document.querySelectorAll(".enemy");
    allEnemys.forEach(element => {
        if(element){
            let status = element.getBoundingClientRect();
            if(status.right < 0){
                element.remove();
                flagCollisionEnemy = false;
            }
        }
    });
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description function in charge of eliminating the collectibles  items on the screen.
 */
function deleteItems() {  
    goldItems.forEach((g,index) => {
        const status = g.status();
        document.querySelector(".containerGame").removeChild(g.collectible);
        goldItems.splice(index, 1); // indice - cant de elementos a borrar;
        chosenGoldItem = null; 
    });

    livesItems.forEach((l,index) => {
        const status = l.status();
        document.querySelector(".containerGame").removeChild(l.collectible);
        livesItems.splice(index, 1); // indice - cant de elementos a borrar;
        livesItemChose = null;         
    });
    
}

function getRandomTime(minimumTime, maximumTime) {
    return Math.random() * (maximumTime - minimumTime) + minimumTime;
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function fill an array with collectibles from the game.
 */
function generateCollectibles(){
    let goldIngot = new GoldItem("goldIngot",500,6000);
    let silverIngot = new GoldItem("silverIngot",250,3000);
    let chest = new GoldItem("chest",1000,10000);
    let itemOfOneLive = new LifeItem("potionLive",1,10000);
    let itemOfTwoLive = new LifeItem("potionLiveTwo",3,25000);

    goldItems.push(goldIngot,silverIngot,chest);
    livesItems.push(itemOfOneLive,itemOfTwoLive);
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function updates and displays the points.
 */
function showPoints() {
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

    let containerLife = document.querySelector(".life");
    let src = lifeStates[0].src;
    containerLife.style.background = "url(" + src + ") no-repeat";
    containerLife.style.backgroundSize = "200px 100px";
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function is used to activate the sound.
 */
function soundActivated(){
    soundOn = true;
    soundOff = false;
    btnSoundOn.classList.add("disguise");
    btnSoundOff.classList.remove("disguise");
}


/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function is used to turn off the sound.
 */
function soundDesactived() {
    soundOff = true;
    soundOn = false;
    btnSoundOn.classList.remove("disguise");
    btnSoundOff.classList.add("disguise");
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function is used to activate the menu sound.
 */
function activeMenuSound() {
    soundActivated();
    sectionMenu.appendChild(MENU_SOUND.audio);
    MENU_SOUND.play();
}

/**
 * @autor Lautaro Gallo https://github.com/lautarovg02
 * @description This function is used to desactivate the menu sound.
 */
function desactivateMenuSound(){
    soundDesactived()    ;
    MENU_SOUND.stop();
}