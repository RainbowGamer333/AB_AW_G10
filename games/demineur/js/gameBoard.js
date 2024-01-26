import { Grid } from "./grid.js";

let interval;
let time = 0;

export class GameBoard {
    constructor(nbRows, nbCols, nbMines) {
        this.gameBoard = document.getElementById("gameBoard");
        this.grille = document.getElementById("grille");
        this.timer = document.getElementById("gameBoardHeaderTime");

        this.nbRows = nbRows;
        this.nbCols = nbCols;
        this.nbMines = nbMines;

        this.tailleCells = 30;
        this.tailleMargin = 60;


        this.grid = new Grid(nbRows, nbCols, nbMines);
        this.initialiseTimer();
        //this.startTimer();

        this.ajouterGrille();
        this.setStyle();
    }

    initialiseTimer() {
        time = 0;
        this.timerUnit = document.createElement("img");
        this.timerTens = document.createElement("img");
        this.timerHundreds = document.createElement("img");

        this.timer.appendChild(this.timerHundreds);
        this.timer.appendChild(this.timerTens);
        this.timer.appendChild(this.timerUnit);

        this.displayTimer();
    }

    startTimer() {
        let interval = setInterval(this.updateTimer, 1000);
    }

    updateTimer() {
        console.log("timer updated");
        time++;
        //this.displayTimer();
    }

    stopTimer() {
        clearInterval(interval);
    }

    displayTimer() {
        let hundreds = Math.floor(time / 100);
        let tens = Math.floor((time - hundreds * 100) / 10);
        let unit = time - (hundreds * 100) - (tens * 10);

        this.timerHundreds.src = "./assets/timer" + hundreds + ".png";
        this.timerTens.src = "./assets/timer" + tens + ".png";
        this.timerUnit.src = "./assets/timer" + unit + ".png";
    }

    ajouterGrille() {
        this.grille.appendChild(this.grid.miningGrid);
    }

    setStyle() {
        this.setTailleCells();
        this.setTailleGrille();
    }

    setTailleGrille() {
        let grille = document.getElementById("grille");
        let gameBoard = document.getElementById("gameBoard");
        let width = (this.nbCols * this.tailleCells) + "px";
        gameBoard.style.width = width;
    }

    setTailleCells() {
        let cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.width = this.tailleCells + "px";
            cells[i].style.height = this.tailleCells + "px";
        }
    }
}