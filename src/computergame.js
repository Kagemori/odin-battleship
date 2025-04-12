import { Player } from "./player.js";

let p1Board = document.querySelector("#p1-gameboard");
let p2Board = document.querySelector("#p2-gameboard");

function P1TileShipPlacer(ship,shipDirection,gameboard){
    let p1Tiles = document.querySelectorAll("div.p1-tile");
    let p1board = gameboard.board;
    
    for(let i = 0; i < p1Tiles.length; i++){
        p1Tiles[i].addEventListener('click', (e) => {
            e.preventDefault();
    
            if(shipDirection == "x"){
                if((i%10)+ship.length > 10){
                    return alert("Invalid placement!");
                }else{
                    let validPlacement = true;
                    let k = i;
                    for(let j = i; j < i+ship.length; j++){
                        let board = gameboard.board[j];
                        if(board.hasShip != false){
                            validPlacement = false;
                        }
                    }

                    if(validPlacement == true){
                        for(let m = k; m < k+ship.length; m++){
                            let board = gameboard.board[m];
                            board.hasShip = ship;
                        }
                    }else{
                        return alert("Invalid placement! Overlapping with another ship!");
                    }
                }
            }else if(shipDirection == "y"){
                if((i%10)+ship.length > 10){
                    return alert("Invalid placement!");
                }else{
                    for(let j = 0; j < ship.length; j++){
                        let board = gameboard.board[i+(j*10)];
                        if(board.hasShip != false){
                            return alert("Invalid placement! Overlapping with another ship!");
                        }else{
                            board.hasShip = ship;
                        }
                    }
                }
            }

            updateP1ShipPlacement(p1board);
            checkP1BoardSet(p1board);
        })
    }
}

function P1TileMaker(index,tileinfo){
    let tile = document.createElement('div');
    tile.classList.add("p1-tile");
    tile.textContent = index;

    let info = document.createElement('div');
    info.classList.add("p1-tileinfo");
    info.textContent = tileinfo;

    tile.appendChild(info);
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

    let shipHealth = document.querySelectorAll(`.info-shiphealth`);
    for(let i = 0; i < p1ships.length; i++) {
        shipHealth[i].textContent = `${(p1ships[i].length - p1ships[i].sunk)} / ${p1ships[i].length}`;
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
    let p1gb = p1.gameboard;
    let board = p1gb.board;

    let direction = "x";
    
    P1InfoPlacer(p1);

    for(let i = 0; i < 100; i++){
        let hasShip = board[i].hasShip;

        P1TileMaker(i,hasShip);
        P2TileMaker(i);
    }

    initShipPlacement(p1.gameboard,direction);
}

function initShipPlacement(gameboard, direction){
    let gbShip = gameboard.ships;

    let infoSelect = document.querySelectorAll(".info-shipcontainer");
    let announcer = document.querySelector("#announcer");

    console.log(infoSelect);

    for(let i = 0; i < infoSelect.length; i++){
        infoSelect[i].addEventListener('click', (e) => {
            e.preventDefault();

            announcer.textContent = `Placing ${gbShip[i].shipname}`;

            removeShipPlacement(gbShip[i],gameboard.board);

            P1TileShipPlacer(gbShip[i],direction,gameboard);
        })
    }
}

function removeShipPlacement(gbShip, board) {
    board.forEach(element => {
        if(element.hasShip == gbShip){
            element.hasShip = false;
        }
    });

    updateP1ShipPlacement(board);
}

function updateP1ShipPlacement(board) {
    console.log(board);

    let p1GBDiv = document.querySelector("#p1-gameboard");

    while(p1GBDiv.lastElementChild) {
        p1GBDiv.removeChild(p1GBDiv.lastElementChild);
    }

    for(let i = 0; i < 100; i++){
        let hasShip = board[i].hasShip;

        if(typeof hasShip == 'object'){
            hasShip = hasShip.shipname;
        }

        P1TileMaker(i,hasShip);
    }
}

function checkP1BoardSet(board) {
    let carr,bship,cruise,sub,dest = false;
    for(let i = 0; i < board.length; i++){
        if(typeof board[i].hasShip == 'object'){
            let ship = board[i].hasShip;
            let name = ship.shipname;

            switch(name){
                case 'Carrier':
                    carr = true;
                    break;
                case 'Battleship':
                    bship = true;
                    break;
                case 'Cruiser':
                    cruise = true;
                    break;
                case 'Submarine':
                    sub = true;
                    break;
                case 'Destroyer':
                    dest = true;
                    break;
            }
        }
    }
    if(carr == true && bship == true && cruise == true && sub == true && dest == true){
            initStartGame();
    }
}

function initStartGame(){
    console.log("Ready to start match!");
}

export {initCompGame}