import { Player } from "./src/player.js";
import { Gameboard } from "./src/gameboard.js";
import { Ship } from "./src/ship.js";
import { checkP1BoardSet, ComputerShipPlacer } from "./src/computergame.js";

test('Create player object and fill human player info', () => {
    let p1 = new Player;
    p1.name = "Soul";
    p1.playerType = "Human";
    expect(p1.name).toBe("Soul");
    expect(p1.playerType).toBe("Human");
})

test('Create player board and dont fill and check if no ships were placed', () => {
    let p1 = new Player;
    expect(checkP1BoardSet(p1.gameboard.board)).toBe(false);
})

test('Create player board and randomly fill and check if all ships were placed', () => {
    let p1 = new Player;
    ComputerShipPlacer(p1);
    expect(checkP1BoardSet(p1.gameboard.board)).toBe(true);
})

