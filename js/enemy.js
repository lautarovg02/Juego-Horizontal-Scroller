class Enemy extends Character{
    /**
     * @constructor
     */
    constructor(){
        super();
        /**
         * @type character - {HTMLElement} 
         * */
        this.monster = document.createElement("div");
        this.monster.classList.add("enemy");
        document.querySelector(".container").appendChild(this.monster);
    }

    status() {
        //*returns a DOMRect Object that provides information about the size of an element and its position relative to the viewport.
        this.monster.getBoundingClientRect();
    }

    /**
     * @autor Lautaro Gallo https://github.com/lautarovg02
     * @description This method changes the character's action to walking.
     */
    walking(){
        this.monster.classList.add("walk");
        this.monster.addEventListener("animationend", () => {
            this.clean();
        });
        
    }

    /** 
     * @autor Lautaro Gallo https://github.com/lautarovg02
     * @description This method removes all classes that contain actions for the character.
    */
    clean(){
        let enemyBox = document.querySelector(".enemy");
        if(enemyBox){
            document.querySelector(".enemy").remove();
        }
        this.monster.classList.remove("walk");
        this.monster.removeEventListener("animationend", () => {}); 
    }
}
