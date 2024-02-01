import { GameBoard } from "./gameBoard.js";

let nbRows = 10;
let nbCols = 11;
let nbMines = 20;



function onload() {
    let gameBoard = new GameBoard(nbRows, nbCols, nbMines);
}



window.addEventListener("load", onload);