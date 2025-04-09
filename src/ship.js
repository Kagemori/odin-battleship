class Ship{
    constructor(name, length){
        this.length = length;
        this.shipname = name;
        this.hits = 0;
        this.sunk = false;
    }

    hit(){
        this.hits = this.hits + 1;
        this.isSunk();
    }

    isSunk(){
        if(this.hits >= this.length){
            this.sunk = true;
        }
    }
}

export {Ship}