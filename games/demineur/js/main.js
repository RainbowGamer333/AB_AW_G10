import { GameBoard } from "./gameBoard.js";
import {ScoreboardDemineur} from "../../../js/Scoreboard.js";
import AchievementUtils from "../../../js/AchievementUtils.js";
import {initialiserScoresDemineur} from "../../../js/localStorageInitialiser/scoreInitialiser.js";

const account = JSON.parse(sessionStorage.getItem("account"));
const scoreboard = document.querySelector(".scoreboard");
const overlay = document.getElementById("overlay");
const cancel = document.querySelectorAll(".cancel");
const difficulte = document.getElementById("difficulte");
const popupDifficulte = document.getElementById("popupDifficulte");
const formDifficulte = document.getElementById("formDifficulte");
const theme = document.getElementById("theme");
const popupTheme = document.getElementById("popupTheme");
const formTheme = document.getElementById("formTheme");
const custom = document.getElementById("custom");
const customW = document.getElementById("customW");
const customH = document.getElementById("customH");
const customM = document.getElementById("customM");
let gameBoard;

function onload() {
    if (account === null) window.location.href = "/AB_AW_G10/account/log-in.html";
    if (scoreboard.children[1].querySelector(".score").innerHTML === "(...)") {
        initialiserScoresDemineur();
    }
    gameBoard = new GameBoard(9, 9, 10, "facile");
    setupForm();
    AchievementUtils.init("demineur");
}

/**
 * Initialise les événements du formulaire.
 */
function setupForm() {

    difficulte.addEventListener("click", function() {
        overlay.style.display = "block";
        popupDifficulte.style.display = "block";
    });

    formDifficulte.addEventListener("submit", (e) => {
        e.preventDefault();
        overlay.style.display = "none";
        popupDifficulte.style.display = "none";
        submitDifficulte();
    });


    theme.addEventListener("click", function() {
       overlay.style.display = "block";
       popupTheme.style.display = "block";
    });

    formTheme.addEventListener("submit", (e) => {
        e.preventDefault();
        overlay.style.display = "none";
        popupTheme.style.display = "none";
        //submitTheme();
    });

    cancel.forEach(cancelButton => {
        cancelButton.addEventListener("click", function() {
            overlay.style.display = "none";
            popupDifficulte.style.display = "none";
            popupTheme.style.display = "none";
        });
    });




    displayCustoms(custom.checked);
    let diff = document.querySelectorAll('input[name="diff"]');
    diff.forEach((radio) => {
        radio.addEventListener('change', function() {
            displayCustoms(this.value === "custom");
        });
    });
}

/**
 * Affiche les champs de personnalisation si la case est cochée.
 * @param checked Si la case est cochée
 */
function displayCustoms(checked) {
    customW.hidden = !checked;
    customH.hidden = !checked;
    customM.hidden = !checked;
}


/**
 * Soumet le formulaire.
 */
function submitDifficulte() {
    let diff = document.querySelector('input[name="diff"]:checked').value;
    switch(diff) {
        case "facile":
            gameBoard.reinitialiserGrille(9, 9, 10, "facile");
            ScoreboardDemineur.displayFacile();
            break;
        case "moyen":
            gameBoard.reinitialiserGrille(16, 16, 40, "moyen");
            ScoreboardDemineur.displayMoyen();
            break;
        case "difficile":
            gameBoard.reinitialiserGrille(30, 16, 99, "difficile");
            ScoreboardDemineur.displayDifficile();
            break;
        case "custom":
            let nbCols = document.querySelector('input[name="customW"]').value;
            let nbRows = document.querySelector('input[name="customH"]').value;
            let nbMines = document.querySelector('input[name="customM"]').value;

            nbCols = nbCols < 9 ? 9 : nbCols;
            nbMines = nbMines < 1 ? 1 : nbMines;

            gameBoard.reinitialiserGrille(nbCols, nbRows, nbMines, "custom");
            break;
    }
}

export function resetDemineur() {
    gameBoard.resetGame();
}


window.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");
    if (window.location.href.includes("demineur")) onload();
});