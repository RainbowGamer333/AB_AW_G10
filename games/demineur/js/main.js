import { GameBoard } from "./gameBoard.js";

const game = document.getElementById("game");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const gameBoard = new GameBoard(9, 9, 10);
const form = document.getElementById("form");
const custom = document.getElementById("custom");
const customW = document.getElementById("customW");
const customH = document.getElementById("customH");
const customM = document.getElementById("customM");

function onload() {
    setupForm(form);
}

function setupForm(form) {
    game.addEventListener("click", function() {
        console.log("click");
        overlay.style.display = "block";
        popup.style.display = "block";
    });

    displayCustoms(custom.checked);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        overlay.style.display = "none";
        popup.style.display = "none";
        submitForm();
    });

    let diff = document.querySelectorAll('input[name="diff"]');
    diff.forEach((radio) => {
        radio.addEventListener('change', function() {
            displayCustoms(this.value === "custom");
        });
    });
}

function displayCustoms(checked) {
    customW.hidden = !checked;
    customH.hidden = !checked;
    customM.hidden = !checked;
}


function submitForm() {
    let diff = document.querySelector('input[name="diff"]:checked').value;
    switch(diff) {
        case "facile":
            gameBoard.reinitialiserGrille(9, 9, 10);
            break;
        case "moyen":
            gameBoard.reinitialiserGrille(16, 16, 40);
            break;
        case "difficile":
            gameBoard.reinitialiserGrille(30, 16, 99);
            break;
        case "custom":
            let nbCols = document.querySelector('input[name="customW"]').value;
            let nbRows = document.querySelector('input[name="customH"]').value;
            let nbMines = document.querySelector('input[name="customM"]').value;

            nbCols = nbCols < 9 ? 9 : nbCols;
            nbMines = nbMines < 1 ? 1 : nbMines;

            gameBoard.reinitialiserGrille(nbCols, nbRows, nbMines);
            break;
    }
}





window.addEventListener("load", onload);