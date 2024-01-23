import { Grid } from "./grid.js";

function onload() {
    let gameBoard = document.getElementById("gameBoard");
    let grid = new Grid(10, 10, 5);

    gameBoard.appendChild(grid.miningGrid);
}



window.addEventListener("load", onload);