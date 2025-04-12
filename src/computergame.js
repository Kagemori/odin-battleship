import { Player } from "./player.js";

let p1Board = document.querySelector("#p1-gameboard");
let p2Board = document.querySelector("#p2-gameboard");

function P1TileShipPlacer(ship,gameboard){
    let p1Tiles = document.querySelectorAll("div.p1-tile");
    let p1board = gameboard.board;
    let shipDirection = "x";

    let p1Info = document.querySelector("#p1-info");
    let changeDirection = document.createElement('button');
    changeDirection.classList.add("info-changeDir");
    changeDirection.textContent = "Placing Ship Horizontally (X-axis)";

    changeDirection.addEventListener('click', (e) => {
        if(shipDirection == "x"){
            shipDirection = "y";
            changeDirection.textContent = "Placing Ship Vertically (Y-axis)";
        }else{
            shipDirection = "x";
            changeDirection.textContent = "Placing Ship Horizontally (X-axis)";
        }
    })
    
    let changeDirExists = p1Info.querySelector(".info-changeDir");
    if(changeDirExists){
        changeDirExists.remove();
        p1Info.appendChild(changeDirection);
    }else{
        p1Info.appendChild(changeDirection);
    }
    
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
                if((i)+(ship.length*10) > 109){
                    return alert("Invalid placement!");
                }else{
                    let validPlacement = true;
                    let k = i;
                    
                    for(let j = 0; j < ship.length; j++){
                        let board = gameboard.board[i+(j*10)];
                        if(board.hasShip != false){
                            validPlacement = false;
                        }
                    }

                    if(validPlacement == true){
                        for(let m = 0; m < ship.length; m++){
                            let board = gameboard.board[k+(m*10)];
                            board.hasShip = ship;
                        }
                    }else{
                        return alert("Invalid placement! Overlapping with another ship!");
                    }
                }
            }

            updateP1ShipPlacement(p1board);
            if(checkP1BoardSet(p1board)){
                initStartGame();
            }else{
                console.log("Missing ships!");
            };
        })
    }
}

function ComputerShipPlacer(compPlayer){
    let ships = compPlayer.gameboard.ships;

    ships.forEach(element => {
        let placedShip = false;
        while(placedShip != true){
            let direction = Math.random() < 0.5 ? "x" : "y";
            let index = Math.floor(Math.random()*100);

            placedShip = ComputerCheckPlacement(compPlayer,index,direction,element);
        }
    });
}

function ComputerCheckPlacement(compPlayer,i,direction,ship){
    let gameboard = compPlayer.gameboard;
    if(direction == "x"){
        if((i%10)+ship.length > 10){
            return false;
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
                return false;
            }
        }
    }else if(direction == "y"){
        if((i)+(ship.length*10) > 109){
            return false;
        }else{
            let validPlacement = true;
            let k = i;
            
            for(let j = 0; j < ship.length; j++){
                let board = gameboard.board[i+(j*10)];
                if(board.hasShip != false){
                    validPlacement = false;
                }
            }

            if(validPlacement == true){
                for(let m = 0; m < ship.length; m++){
                    let board = gameboard.board[k+(m*10)];
                    board.hasShip = ship;
                }
            }else{
                return false;
            }
        }
    }
    return true;
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

function InfoPlacer(player){
    if(player.playerType == "Human"){
        let infoName = document.querySelector("#p1-name");
        infoName.textContent = player.name;
    }else{
        let infoName = document.querySelector("#p2-name");
        infoName.textContent = player.name;
    }

    let gameboard = player.gameboard;
    let ships = gameboard.ships;

    for(let i = 0; i < ships.length; i++) {
        InfoShipPlacer(ships[i].shipname,player);
    }

    if(player.playerType == "Human"){
        let p1Ships = document.querySelector("#p1-ships");
        let shipHealth = p1Ships.querySelectorAll(`.info-shiphealth`);
        for(let i = 0; i < ships.length; i++) {
            shipHealth[i].textContent = `${(ships[i].length - ships[i].sunk)} / ${ships[i].length}`;
        }
    }else{
        let p1Ships = document.querySelector("#p2-ships");
        let shipHealth = p1Ships.querySelectorAll(`.info-shiphealth`);
        for(let i = 0; i < ships.length; i++) {
            shipHealth[i].textContent = `? / ${ships[i].length}`;
        }
    }
}

function InfoShipPlacer(inputName,player){
    let shipContainer = document.createElement('div');
    shipContainer.classList.add("info-shipcontainer");
    let shipName = document.createElement("div");
    shipName.classList.add("info-shipname");
    shipName.textContent = inputName;
    let shipHealth = document.createElement("div");
    shipHealth.classList.add("info-shiphealth");

    shipContainer.appendChild(shipName);
    shipContainer.appendChild(shipHealth);

    if(player.playerType == "Human"){
        let infoShip = document.querySelector("#p1-ships");
        infoShip.appendChild(shipContainer);
    }else{
        let infoShip = document.querySelector("#p2-ships");
        infoShip.appendChild(shipContainer);
    }
}

function initCompGame(){
    let p1 = new Player();
    p1.playerType = "Human";
    p1.name = prompt("Enter your name","Player");
    let p1gb = p1.gameboard;
    let board = p1gb.board;

    let p2 = new Player();
    p2.playerType = "Computer";
    p2.name = "Q";

    InfoPlacer(p1);
    InfoPlacer(p2);

    for(let i = 0; i < 100; i++){
        let hasShip = board[i].hasShip;

        P1TileMaker(i,hasShip);
        P2TileMaker(i);
    }

    ComputerShipPlacer(p2);

    initShipPlacement(p1.gameboard);
}

function initShipPlacement(gameboard){
    let gbShip = gameboard.ships;

    let p1InfoShips = document.querySelector("#p1-ships");
    let infoSelect = p1InfoShips.querySelectorAll(".info-shipcontainer");
    let announcer = document.querySelector("#announcer");

    for(let i = 0; i < infoSelect.length; i++){
        infoSelect[i].addEventListener('click', (e) => {
            e.preventDefault();

            announcer.textContent = `Placing ${gbShip[i].shipname}`;

            removeShipPlacement(gbShip[i],gameboard.board);

            P1TileShipPlacer(gbShip[i],gameboard);
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
            return true;
    }else{
        return false;
    }
}

function initStartGame(){
    console.log("Ready to start match!");
}

export {initCompGame}