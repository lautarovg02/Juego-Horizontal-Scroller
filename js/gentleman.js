class GentleMan extends Character{

    /**
     * @constructor
     */
    constructor(){
        super();
        /**
         * @type character - {HTMLElement} 
         * */
        this.character = document.getElementById("character");
    }

    status() {
        //*returns a DOMRect Object that provides information about the size of an element and its position relative to the viewport.
        return this.character.getBoundingClientRect();
    }
    /**
     * @autor Lautaro Gallo https://github.com/lautarovg02
     * @description This method changes the character's action to running.
     */
    running(){
            this.clean();
            this.character.classList.add("run"); 
    }

    /**
     * @autor Lautaro Gallo https://github.com/lautarovg02
     * @description This method changes the character's action to jumping.
     */
    jumping(){
        if(this.character.classList.contains("run")) {       
            this.clean(); 
            this.character.classList.add("jump");
            this.character.addEventListener("animationend", () => {
                this.running();
            });
        }
    }

    /** 
     * @autor Lautaro Gallo https://github.com/lautarovg02
     * @description This method removes all classes that contain actions for the character.
    */
    clean(){
        this.character.classList.remove("jump");
        this.character.classList.remove("run");
        this.character.classList.remove("fall");
        this.character.removeEventListener("animationend", () => {}); 
    }
}