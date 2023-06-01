class Monster extends GameObjects{
    /**
     * @constructor
     */
    constructor(velocity){
        super();
        /**
         * @type character - {HTMLElement} 
         * */
        this.monster = document.createElement("div");
        this.monster.classList.add("enemy");
        this.velocity = velocity;
        this.crash = false;
        this.monster.style.animation = `walking .8s steps(8) infinite, moveEnemyBox ${this.velocity}s linear`;
        document.querySelector(".containerGame").appendChild(this.monster);
    }

    status() {
        return this.monster.getBoundingClientRect();
    }

    getNode(){
        return this.monster;
    }

    getCrash(){
        return this.crash;
    }

    
    setCrash(value){
        return this.crash  = value;
    }

    /**
     * @description This method changes the character's action to walking.
     */
    checkCollision(mainCharacter){
        let characterChose = mainCharacter.status();
        let enemyChose = this.status();
        let pos_character = {
            t: characterChose.top - 20,
            l: characterChose.left,
            r: characterChose.left + characterChose.width - 95,
            b: characterChose.top + characterChose.height - 90
        };
        let pos_enemy = {
            t: enemyChose.top,
            l: enemyChose.left,
            r: enemyChose.left + enemyChose.width - 101,
            b: enemyChose.top + enemyChose.height - 101,
        };

        if (pos_character.l <= pos_enemy.r && pos_character.r >= pos_enemy.l
            && pos_character.b >= pos_enemy.t && pos_character.t <= pos_enemy.b) {
                return true;
            }
        else{
            return false;
        }
    }

    /** 
     * @description This method removes all classes that contain actions for the character.
    */
    clean(){
        let enemyBox = document.querySelectorAll(".enemy");
        if(enemyBox){
            document.querySelector(".enemy").remove();
        }
        this.monster.classList.remove("walk");
        this.monster.removeEventListener("animationend", () => {}); 
    }
}
