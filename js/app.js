"use strict";

let in_game = false;
let gentleman = null;
let enemy = null;


/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {
    procesar_entrada_usuario();
    actualizar_estado();
    renderizar();

    if (in_game) {
        requestAnimationFrame(gameLoop);
    }
}

function procesar_entrada_usuario() {
    if(!enemy && !gentleman) {
        gentleman = new GentleMan();
        gentleman.running();
        //* enemy = new Enemy();
    }
    in_game = true;
}
function actualizar_estado() {}
function renderizar() {}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "w") {
        console.log("saltaaa");
        gentleman.jumping();
    }
});

gameLoop();
