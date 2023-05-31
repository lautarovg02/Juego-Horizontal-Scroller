class GoldItem extends Collectibles {

    constructor(name, goldQuantity,time ){
        super(name,time);
        /**
         * @type {number}
         */
        this.goldQuantity = goldQuantity;
        this.timeGeneration = time;
    }

    getGold(){
        return this.goldQuantity;
    }

}