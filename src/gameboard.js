import { Ship } from "./ship.js";

class Gameboard{
    constructor(){
        this.board = [];
        this.ships = [];

        if(!this.board || !this.board.length){
            this.initializeBoard();
        }
    }

    initializeBoard(){
        for(let i = 0; i < 100; i++){
            this.board.push({hasShip:false,wasShot:false});
        }

        let shipNames = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"];
        let shipLengths = [5, 4, 3, 3, 2];

        for(let i = 0; i < 5; i++){
            let newShip = new Ship(shipNames[i],shipLengths[i]);
            this.ships.push(newShip);
        }
    }

    receiveAttack(indexCoord){
        let tile = this.board[indexCoord];
        let ship = tile.hasShip;
        if(ship != false){
            tile.wasShot = true;
            ship.hit();
            return true;
        }else{
            tile.wasShot = true;
            return false;
        }
    }

}

export {Gameboard}