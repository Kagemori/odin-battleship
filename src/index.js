import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import './css/styles.css';
import { initCompGame } from "./computergame.js";

let comp = document.querySelector("#comp-match");

comp.addEventListener('click', (e) => {
    initCompGame();
    comp.remove();
});