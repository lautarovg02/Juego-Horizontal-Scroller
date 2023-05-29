class Enemys extends GameObjects{
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
        document.querySelector(".containerGame").appendChild(this.monster);
    }

    status() {
        return this.monster.getBoundingClientRect();
    }

    /**
     * @description This method changes the character's action to walking.
     */
    walking(){
        this.monster.classList.add("walk");
        this.monster.addEventListener("animationend", () => {
            this.clean();
        });
    }

    /** 
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
