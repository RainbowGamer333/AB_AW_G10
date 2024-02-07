import { GameBoard } from "./gameBoard.js";

const gameBoard = new GameBoard(10, 10, 10);

function onload() {
    let form = document.getElementById("form");
    form.addEventListener("submit", submitForm);
}


function submitForm(event) {
    event.preventDefault();
    gameBoard.reinitialiserGrille(9, 5, 5);
}



window.addEventListener("load", onload);