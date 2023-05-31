class LifeItem extends Collectibles {

    constructor(name,livesQuantity,time ){
        super(name,time);
        this.livesQuantity = livesQuantity;
    }

    getLives(){
        return this.livesQuantity;
    }
}