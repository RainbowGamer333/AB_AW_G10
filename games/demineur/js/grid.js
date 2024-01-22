import {Cell} from "./cell.js";

export class Grid {

    constructor(numberRows, numberColumns, numberMines) {
        this._miningGrid =  document.createElement("table");
        this._miningGrid.id = "miningGrid";
        this.cells = [];
        this.creerGrid(numberRows, numberColumns);
        this.ajouterListeners();
        this.initialiserMines(numberMines);
        this.initialiserValeurs();

        //this.afficherMines();
        //this.#afficherToutesCellules();
    }

    get miningGrid() {
        return this._miningGrid;
    }

    creerGrid(numberRows, numberColumns) {
        let tbody = document.createElement("tbody");

        // Génération table
        for (let i = 0; i < numberRows; i++) {
            let tr = document.createElement("tr");
            let rows = [];

            for (let j = 0; j < numberColumns; j++) {
                let cellule = Cell.creerCellule();
                tr.appendChild(cellule.element);
                rows.push(cellule);
            }
            tbody.appendChild(tr);
            this.cells.push(rows);
        }
        this._miningGrid.appendChild(tbody);
    }

    initialiserMines(numberMines) {
        let nbMines = 0;
        while (nbMines < numberMines) {
            let cellule = this.cells[Math.floor(Math.random() * this.cells.length)][Math.floor(Math.random() * this.cells[0].length)];
            if (!cellule.isMine()) {
                cellule.setMine();
                nbMines++;
            }
        }
    }

    ajouterListeners() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];

                // Ajouter un drapeau avec clique droit
                cell.element.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    if (cell.visible) return;
                    cell.toggleFlag();
                });


                // Afficher la cellule avec clique gauche
                this.afficherMines = this.afficherMines.bind(this);
                cell.element.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (cell.flag) return;
                    if (cell.isMine()) {
                        console.log("Vous avez perdu !");
                        this.afficherMines();
                        return;
                    }
                    cell.afficheCellule();
                });
            }
        }
    }



    initialiserValeurs() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (this.cells[i][j].isMine()) continue;
                this.cells[i][j].valeur = this.compterMines(i, j);
            }
        }
    }

    compterMines(row, col) {
        let nbMines = 0;
        let nbRows = this.cells[0].length-1;
        let nbCols = this.cells.length-1;

        // Haut
        if (row > 0) {
            if (col > 0 && this.cells[row - 1][col - 1].isMine()) nbMines++;
            if (this.cells[row - 1][col].isMine()) nbMines++;
            if (col < nbCols && this.cells[row - 1][col + 1].isMine()) nbMines++;
        }

        // Cotes
        if (col > 0 && this.cells[row][col - 1].isMine()) nbMines++;
        if (col < nbCols && this.cells[row][col + 1].isMine()) nbMines++;

        // Bas
        if (row < nbRows) {
            if (col > 0 && this.cells[row + 1][col - 1].isMine()) nbMines++;
            if (this.cells[row + 1][col].isMine()) nbMines++;
            if (col < nbCols && this.cells[row + 1][col + 1].isMine()) nbMines++;
        }
        return nbMines;
    }

    gameOver() {
        this.afficherMines();
    }

    afficherMines() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];
                if (cell.isMine() && !cell.flag) {
                    this.cells[i][j].afficheCellule();
                }
                else if (!cell.isMine() && cell.flag) {
                    this.cells[i][j].afficheFakeMine();
                }
            }
        }
    }


    #afficherToutesCellules() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j].afficheCellule();
            }
        }
    }
}