import { GameBoard } from "./gameBoard.js";

const gameBoard = new GameBoard(10, 10, 10);

function onload() {
    let form = document.getElementById("form");
    form.addEventListener("submit", submitForm);
}


function submitForm(event) {
    event.preventDefault();

    let diff = document.querySelector('input[name="diff"]:checked').value;
    switch(diff) {
        case "facile":
            gameBoard.reinitialiserGrille(9, 5, 5);
            break;
        case "moyen":
            gameBoard.reinitialiserGrille(16, 8, 15);
            break;
        case "difficile":
            gameBoard.reinitialiserGrille(16, 16, 40);
            break;
        case "custom":
            let nbCols = document.getElementById("customW").value;
            let nbRows = document.getElementById("customH").value;
            let nbMines = document.getElementById("customM").value;

            nbCols = nbCols < 9 ? 9 : nbCols;
            nbMines = nbMines < 1 ? 1 : nbMines;

            gameBoard.reinitialiserGrille(nbCols, nbRows, nbMines);
            break;
    }
}



window.addEventListener("load", onload);