import { Grid } from "./grid.js";

/**
 * Le plateau de jeu. Contient toutes les fonctions pour gérer les éléments en dehors de la grille.
 */
export class GameBoard {
    constructor(nbRows, nbCols, nbMines, difficulty) {
        this.gameBoard = document.getElementById("gameBoard");
        this.grille = document.getElementById("grille");

        this.nbRows = nbRows;
        this.nbCols = nbCols;
        this.nbMines = nbMines;
        this.difficulty = difficulty;

        this.tailleCells = 30;
        this.tailleMargin = 60;

        this.grid = new Grid(this, nbRows, nbCols, nbMines, difficulty);
        this.ajouterGrille();
        this.setStyle();
    }

    /**
     * Ajoute la grille de jeu à la page.
     */
    ajouterGrille() {
        this.grille.appendChild(this.grid.miningGrid);
    }

    /**
     * Réinitialise la grille de jeu avec de nouvelles dimensions et un nouveau nombre de mines.
     * @param nbCols Nombre de colonnes
     * @param nbRows Nombre de lignes
     * @param nbMines Nombre de mines
     * @param difficulty Difficulté de la grille
     */
    reinitialiserGrille(nbCols, nbRows, nbMines, difficulty = this.difficulty) {
        this.grid.stop();
        this.grille.innerHTML = "";

        this.nbCols = nbCols;
        this.nbRows = nbRows;
        this.nbMines = nbMines;

        this.grid = new Grid(this, nbRows, nbCols, nbMines, difficulty);
        this.ajouterGrille();
        this.setStyle();
    }

    /**
     * Met à jour le style de la grille de jeu.
     */
    setStyle() {
        this.gameBoard.style.width = (this.nbCols * this.tailleCells) + "px";

        let cells = document.getElementsByClassName("cell");
        for (let cell  of cells) {
            cell.style.width = this.tailleCells + "px";
            cell.style.height = this.tailleCells + "px";
        }
    }

    /**
     * Réinitialise la grille de jeu avec les mêmes dimensions et le même nombre de mines.
     */
    resetGame() {
        this.reinitialiserGrille(this.nbCols, this.nbRows, this.nbMines);
    }
}