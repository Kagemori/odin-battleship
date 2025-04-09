import { Player } from "./player.js";

let p1Board = document.querySelector("#p1-gameboard");
let p2Board = document.querySelector("#p2-gameboard");

function P1TileShipPlacer(index,ship,shipDirection,gameboard){
    tile.addEventListener('click', (e) => {
        e.preventDefault();

        if(shipDirection == "x"){
            if((index%10)+ship.length > 10){
                return alert("Invalid placement!");
            }else{
                for(let i = index; i < index+ship.length; i++){
                    let board = gameboard.board[i];
                    if(board.hasShip != false){
                        return alert("Invalid placement! Overlapping with another ship!");
                    }else{
                        board.hasShip = ship;
                    }
                }
            }
        }else{
            if((index%10)+ship.length > 10){
                return alert("Invalid placement!");
            }else{
                for(let i = 0; i < ship.length; i++){
                    let board = gameboard.board[index+(i*10)];
                    if(board.hasShip != false){
                        return alert("Invalid placement! Overlapping with another ship!");
                    }else{
                        board.hasShip = ship;
                    }
                }
            }
        }
    })
}

function P1TileMaker(index){
    let tile = document.createElement('div');
    tile.classList.add("p1-tile");
    tile.textContent = index;
    p1Board.appendChild(tile);
}

function P2TileMaker(index){
    let tile = document.createElement('div');
    tile.classList.add("p2-tile");
    tile.textContent = index;
    p2Board.appendChild(tile);
}

function P1InfoPlacer(p1){
    let infoName = document.querySelector("#p1-name");
    infoName.textContent = p1.name;

    let p1gameboard = p1.gameboard;
    let p1ships = p1gameboard.ships;

    for(let i = 0; i < p1ships.length; i++) {
        P1InfoShipPlacer(p1ships[i].shipname);
    }
}

function P1InfoShipPlacer(inputName){
    let infoShip = document.querySelector("#p1-ships");
    let shipContainer = document.createElement('div');
    shipContainer.classList.add("info-shipcontainer");
    let shipName = document.createElement("div");
    shipName.classList.add("info-shipname");
    shipName.textContent = inputName;
    let shipHealth = document.createElement("div");
    shipHealth.classList.add("info-shiphealth");

    shipContainer.appendChild(shipName);
    shipContainer.appendChild(shipHealth);
    infoShip.appendChild(shipContainer);
}

function initCompGame(){
    let p1 = new Player();
    p1.playerType = "Human";
    p1.name = prompt("Enter your name","Player");
    
    P1InfoPlacer(p1);

    for(let i = 0; i < 100; i++){
        P1TileMaker(i);
        P2TileMaker(i);
    }

    initP1ShipPlacement();
}

function initP1ShipPlacement(){

}

export {initCompGame}