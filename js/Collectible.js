class Collectibles  extends GameObjects {
    /**
     * @constructor
     */
    constructor(name, revenue){
        super();
        /**
         * @type character - {HTMLElement} 
         * */
        this.name = name;
        this.revenue = revenue;
        this.collectible = document.createElement("div");
        this.collectible.classList.add("collectible");
        // this.creationTime = time; implement in the future
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

    clean(){
        let collectibleBox = document.querySelector(".collectible");
        this.collectible.classList.remove(this.name);
        this.collectible.removeEventListener("animationend", () => {}); 
    }
}