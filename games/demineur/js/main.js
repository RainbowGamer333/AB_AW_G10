import { Grid } from "./grid.js";

function onload() {
    let gameBoard = document.getElementById("grille");
    let grid = new Grid(10, 10, 10);

    gameBoard.appendChild(grid.miningGrid);
}



window.addEventListener("load", onload);