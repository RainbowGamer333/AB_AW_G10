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

    /**
     * Crée la grille de jeu.
     * @param numberRows le nombre de lignes
     * @param numberColumns le nombre de colonnes
     */
    creerGrid(numberRows, numberColumns) {
        let tbody = document.createElement("tbody");

        // Génération table
        for (let i = 0; i < numberRows; i++) {
            // Génération ligne
            let tr = document.createElement("tr");
            let rows = [];

            // Génération cellules de la ligne
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

    /**
     * Ajoute les listeners sur les cellules de la grille.
     * Le clique droit ajoute un drapeau, le clique gauche affiche la cellule,
     * et le clique du milieu affiche les cellules autour de la cellule si le nombre de drapeaux autour d'elle est égal à sa valeur.
     */
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

                cell.element.addEventListener("dblclick", (e) => {
                    e.preventDefault();
                    if (cell.visible) this.cliqueMilieux(i, j);
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

    /**
     * Affiche toutes les cellules autour de la cellule si le nombre de drapeaux autour d'elle est égal à sa valeur.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     */
    cliqueMilieux(row, col) {
        if (this.compterFlags(row, col) !== this.cells[row][col].valeur) return;
        this.coordonneesAutour(row, col).forEach((coord) => {
            if (this.canDisplay(coord[0], coord[1])) this.cliqueCellule(coord[0], coord[1]);
        });
    }

    /**
     * Initialise les mines dans la grille. Exclut la cellule cliquée de départ.
     * @param numberMines le nombre de mines à placer
     * @param row la ligne de la cellule cliquée
     * @param col la colonne de la cellule cliquée
     */
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

    /**
     * Initialise les valeurs des cellules. Une cellule a pour valeur le nombre de mines autour d'elle.
     */
    initialiserValeurs() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (this.cells[i][j].isMine()) continue;
                this.cells[i][j].valeur = this.compterMines(i, j);
            }
        }
    }

    /**
     * Compte le nombre de mines autour de la cellule.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     * @returns {number} le nombre de mines autour de la cellule
     */
    compterMines(row, col) {
        let nbMines = 0;
        this.coordonneesAutour(row, col).forEach((coord) => {
            if (this.cells[coord[0]][coord[1]].isMine()) nbMines++;
        });
        return nbMines;
    }

    /**
     * Compte le nombre de drapeaux autour de la cellule.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     * @returns {number} le nombre de drapeaux autour de la cellule
     */
    compterFlags(row, col) {
        let nbFlags = 0;
        this.coordonneesAutour(row, col).forEach((coord) => {
            if (this.cells[coord[0]][coord[1]].flag) nbFlags++;
        });
        return nbFlags;
    }

    /**
     * Affiche toutes les cellules vides groupées autour de la cellule, et affiche les cellules non vides autour d'elles.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     */
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

    /**
     * Affiche toutes les mines et les drapeaux mal placés. La mine cliquée est affichée en rouge.
     * @param mineCliquee la mine cliquée
     */
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