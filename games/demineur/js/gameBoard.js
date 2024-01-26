import { Grid } from "./grid.js";

export class GameBoard {
    constructor(nbRows, nbCols, nbMines) {
        this.gameBoard = document.getElementById("gameBoard");
        this.grille = document.getElementById("grille");

        this.nbRows = nbRows;
        this.nbCols = nbCols;
        this.nbMines = nbMines;

        this.tailleCells = 30;
        this.tailleMargin = 60;

        this.grid = new Grid(nbRows, nbCols, nbMines);

        this.ajouterGrille();
        this.setStyle();
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