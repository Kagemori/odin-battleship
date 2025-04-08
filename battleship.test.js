import { Player } from "./src/player.js";
import { Gameboard } from "./src/gameboard.js";
import { Ship } from "./src/ship.js";

test('Create player object and fill human player info', () => {
    let p1 = new Player;
    p1.name = "Soul";
    p1.playerType = "Human";
    expect(p1.name).toBe("Soul");
    expect(p1.playerType).toBe("Human");
})