import { GameBoard } from "./gameBoard.js";

let nbRows = 10;
let nbCols = 11;
let nbMines = 10;



function onload() {
    let gameBoard = new GameBoard(nbRows, nbCols, nbMines);
}


function submitForm() {
    console.log("submitForm");
    return true;
}



window.addEventListener("load", onload);