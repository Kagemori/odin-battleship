class Gameboard{
    constructor(){
        this.board = [];

        if(!this.board || !this.board.length){
            this.initializeBoard();
        }
    }

    initializeBoard(){
        for(let i = 0; i < 100; i++){
            this.board.push({hasShip:false,wasShot:false});
        }
    }

    receiveAttack(indexCoord){
        let tile = this.board[indexCoord];
        let ship = tile.hasShip;
        if(ship != false){
            ship.hit();
            tile.wasShot = true;
        }else{
            tile.wasShot = true;
        }
    }

}

export {Gameboard}