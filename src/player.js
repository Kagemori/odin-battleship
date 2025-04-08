import { Gameboard } from "./gameboard.js";

class Player{
    constructor(){
        this.name = "";
        this.playerType = "";
        this.gameboard = new Gameboard();
    }
}

export {Player}