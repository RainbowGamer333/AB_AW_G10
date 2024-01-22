import {Cell} from "./cell.js";

export class Grid {

    constructor(numberRows, numberColumns, numberMines) {
        this._miningGrid =  document.createElement("table");
        this._miningGrid.id = "miningGrid";
        this.cells = [];
        this.creerGrid(numberRows, numberColumns);
        this.ajouterListeners();
        this.initialiserMines(numberMines);
        this.afficherMines();

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

    afficherMines() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (this.cells[i][j].isMine()) this.cells[i][j].afficheCellule();
            }
        }
    }

    ajouterListeners() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];

                // Ajouter un drapeau avec clique droit
                cell.element.addEventListener("contextmenu", function (e) {
                    e.preventDefault();
                    if (cell.visible) return;
                    cell.toggleFlag();
                });

                // Afficher la cellule avec clique gauche
                cell.element.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (cell.flag) return;
                    cell.afficheCellule();
                });
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