import {Cell} from "./cell.js";

export class Grid {
    _firstClick = true;

    constructor(numberRows, numberColumns, numberMines) {
        this._miningGrid =  document.createElement("table");
        this._miningGrid.id = "miningGrid";
        this._numberMines = numberMines;
        this.cells = [];
        this.creerGrid(numberRows, numberColumns);
        this.ajouterListeners();
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

                    // Le clique droit ne marche pas sur une cellule désactivée ou déjà visible
                    if (cell.disabled || cell.visible) return;
                    cell.toggleFlag();
                });

                // Afficher la cellule avec clique gauche
                cell.element.addEventListener("mouseup", (e) => {
                    e.preventDefault();

                    // Clique du milieu uniquement sur une cellule visible
                    if (e.button === 1 && cell.visible) {
                        this.cliqueMilieux(i, j);
                    }

                    else if (e.button === 0) {
                        // Au premier clique on initialise les mines et les valeurs
                        // Ceci permet de commencer une partie sans cliquer immédiatement sur une mine
                        if (this._firstClick) {
                            this._firstClick = false;
                            this.initialiserMines(this._numberMines, i, j);
                            this.initialiserValeurs();
                        }

                        // Le clique ne marche pas sur une cellule désactivée ou avec un drapeau
                        if (cell.disabled || cell.flag) return;

                        // Si la cellule est vide, on affiche récursivement toutes les cellules vides autour d'elle
                        if (cell.valeur === 0) this.decouvrirZeros(i, j);

                        // Cliquer sur une mine fait perdre la partie
                        if (cell.isMine()) {
                            this.gameOver(cell);
                            return;
                        }
                        cell.afficheCellule();
                    }
                });
            }
        }
    }

    cliqueMilieux(row, col) {
        if (this.compterFlags(row, col) !== this.cells[row][col].valeur) return;
        this.coordonneesAutour(row, col).forEach((coord) => {
            if (this.canDisplay(coord[0], coord[1])) this.cliqueCellule(coord[0], coord[1]);
        });
    }

    initialiserMines(numberMines, row, col) {
        let nbMines = 0;
        while (nbMines < numberMines) {
            let x = Math.floor(Math.random() * this.cells.length);
            let y = Math.floor(Math.random() * this.cells[0].length);
            let cellule = this.cells[x][y];

            if ((x !== row || y !== col) && !cellule.isMine()) {
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
        this.coordonneesAutour(row, col).forEach((coord) => {
            if (this.cells[coord[0]][coord[1]].isMine()) nbMines++;
        });
        return nbMines;
    }

    compterFlags(row, col) {
        let nbFlags = 0;
        this.coordonneesAutour(row, col).forEach((coord) => {
            if (this.cells[coord[0]][coord[1]].flag) nbFlags++;
        });
        return nbFlags;
    }

    decouvrirZeros(row, col) {
        this.cells[row][col].afficheCellule();
        this.canDisplayAutour(row, col).forEach((coord) => {
            if (this.cells[coord[0]][coord[1]].valeur === 0) this.decouvrirZeros(coord[0], coord[1]);
            else if (this.cells[coord[0]][coord[1]].valeur > 0) this.cells[coord[0]][coord[1]].afficheCellule();
        });
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

    /**
     * Renvoie toutes les coordonnées autour de la cellule. Ne comprend pas les cellules sortant de la grille.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     * @returns {*[]} les coordonnées autour de la cellule
     */
    coordonneesAutour(row, col) {
        let nbRows = this.cells[0].length-1;
        let nbCols = this.cells.length-1;
        let coordonnees = [];

        // Haut
        if (row > 0) {
            if (col > 0) coordonnees.push([row-1, col-1]);
            coordonnees.push([row-1, col]);
            if (col < nbCols) coordonnees.push([row-1, col+1]);
        }

        // Cotes
        if (col > 0) coordonnees.push([row, col-1]);
        if (col < nbCols) coordonnees.push([row, col+1]);

        // Bas
        if (row < nbRows) {
            if (col > 0) coordonnees.push([row+1, col-1]);
            coordonnees.push([row+1, col]);
            if (col < nbCols) coordonnees.push([row+1, col+1]);
        }
        return coordonnees;
    }

    /**
     * Renvoie toutes les coordonnées autour de la cellule qui peuvent être affichées. Ne comprend pas les cellules sortant de la grille.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     * @returns {*[]} les coordonnées autour de la cellule qui peuvent être affichées
     */
    canDisplayAutour(row, col) {
        let coordonnees = this.coordonneesAutour(row, col);
        let newCoordonnees = [];
        coordonnees.forEach((coord) => {
            if (this.canDisplay(coord[0], coord[1])) newCoordonnees.push(coord);
        });
        return newCoordonnees;
    }

    canDisplay(row, col) {
        return (!this.cells[row][col].visible && !this.cells[row][col].flag);
    }

    cliqueCellule(row, col) {
        let cell = this.cells[row][col];
        if (cell.isMine()) this.gameOver(cell);
        else {
            if (cell.valeur === 0) this.decouvrirZeros(row, col);
            else cell.afficheCellule();
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