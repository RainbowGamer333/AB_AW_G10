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

        //this.debug_afficherToutesCellules();
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

    ajouterListeners() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];

                // Ajouter un drapeau avec clique droit
                cell.element.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    if (cell.disabled || cell.visible) return;
                    cell.toggleFlag();
                });

                // Afficher la cellule avec clique gauche
                cell.element.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (cell.disabled || cell.flag) return;

                    if (cell.valeur === 0) this.decouvrirZeros(i, j);

                    if (cell.isMine()) {
                        this.gameOver(cell);
                        return;
                    }
                    cell.afficheCellule();
                });
            }
        }
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

    decouvrirZeros(row, col) {
        this.cells[row][col].afficheCellule();

        let nbRows = this.cells[0].length-1;
        let nbCols = this.cells.length-1;

        // Haut
        if (row > 0) {
            if (col > 0 && !this.cells[row-1][col-1].visible) {
                if (this.cells[row-1][col-1].valeur === 0) this.decouvrirZeros(row-1, col-1);
                else if (this.cells[row-1][col-1].valeur > 0) this.cells[row-1][col-1].afficheCellule();
            }

            if (!this.cells[row-1][col].visible) {
                if (this.cells[row-1][col].valeur === 0) this.decouvrirZeros(row-1, col);
                else if (this.cells[row-1][col].valeur > 0) this.cells[row-1][col].afficheCellule();
            }

            if (col < nbCols && !this.cells[row-1][col+1].visible) {
                if (this.cells[row-1][col+1].valeur === 0) this.decouvrirZeros(row-1, col+1);
                else if (this.cells[row-1][col+1].valeur > 0) this.cells[row-1][col+1].afficheCellule();
            }
        }

        // Cotes
        if (col > 0 && !this.cells[row][col-1].visible) {
            if (this.cells[row][col-1].valeur === 0) this.decouvrirZeros(row, col-1);
            else if (this.cells[row][col-1].valeur > 0) this.cells[row][col-1].afficheCellule();
        }

        if (col < nbCols && !this.cells[row][col+1].visible) {
            if (this.cells[row][col+1].valeur === 0) this.decouvrirZeros(row, col+1);
            else if (this.cells[row][col+1].valeur > 0) this.cells[row][col+1].afficheCellule();
        }

        // Bas
        if (row < nbRows) {
            if (col > 0 && !this.cells[row+1][col-1].visible) {
                if (this.cells[row+1][col-1].valeur === 0) this.decouvrirZeros(row+1, col-1);
                else if (this.cells[row+1][col-1].valeur > 0) this.cells[row+1][col-1].afficheCellule();
            }
            if (!this.cells[row+1][col].visible) {
                if (this.cells[row+1][col].valeur === 0) this.decouvrirZeros(row+1, col);
                else if (this.cells[row+1][col].valeur > 0) this.cells[row+1][col].afficheCellule();
            }
            if (col < nbCols && !this.cells[row+1][col+1].visible) {
                if (this.cells[row+1][col+1].valeur === 0) this.decouvrirZeros(row+1, col+1);
                else if (this.cells[row+1][col+1].valeur > 0) this.cells[row+1][col+1].afficheCellule();
            }
        }
    }

    gameOver(mineCliquee) {
        this.afficherMines(mineCliquee);
        this.disableCells();
    }

    afficherMines(mineCliquee) {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];
                if (cell.isMine() && !cell.flag) {
                    if (cell === mineCliquee) cell.valeur = -2;
                    cell.afficheCellule();
                }
                else if (!cell.isMine() && cell.flag) {
                    cell.valeur = -3;
                    cell.afficheCellule();
                }
            }
        }
    }

    disableCells() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j].disable();
            }
        }
    }


    reinitialiserPartie() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j] = Cell.creerCellule();
            }
        }
    }

    debug_afficherToutesCellules() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j].afficheCellule();
            }
        }
    }
}