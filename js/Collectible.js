class Collectibles  extends GameObjects {
    /**
     * @constructor
     */
    constructor(name,time){
        super();
        /**
         * @type character - {HTMLElement} 
         * */
        this.name = name;
        this.time = time;
        this.collectible = document.createElement("div");
        this.collectible.classList.add("collectible");
        document.querySelector(".containerGame").appendChild(this.collectible);
    }

    status() {
        return this.collectible.getBoundingClientRect();
    }

    showCollectableType(){
        let bottomRandom = Math.floor( Math.random() * 290 ) + 100;
        this.collectible.style.bottom = bottomRandom + "px";
        this.collectible.classList.add(this.name);
        this.collectible.addEventListener("animationend", () => {
            this.clean()
        });
    }

    checkCollision(mainCharacter){
        let object = mainCharacter.status();
        let object_pos = {
            t: object.top - 20,
            l: object.left,
            r: object.left + object.width - 95,
            b: object.top + object.height - 90,
        };
        let collection = this.status();
        let collection_pos = {
            t: collection.top,
            l: collection.left,
            r: collection.left + collection.width - 12,
            b: collection.top + collection.height -12,
        };
        if (!(object_pos.r < collection_pos.l || object_pos.l > collection_pos.r || object_pos.b < collection_pos.t ||object_pos.t > collection_pos.b) ) {
            return true;
        }
        else{
            return false;
        }
    }

    clean(){
        this.collectible.classList.remove(this.name);
        this.collectible.removeEventListener("animationend", () => {}); 
    }

    
    getTimeGeneration(){
        return this.time;
    }
}