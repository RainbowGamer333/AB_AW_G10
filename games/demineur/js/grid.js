import {Cell} from "./cell.js";
import {Timer} from "./timer.js";
import {MineCounter} from "./mineCounter.js";
import {Smiley} from "./smiley.js";
import { initialiserScoresDemineur } from "../../../js/localStorageInitialiser/scoreInitialiser.js";
import {ScoreboardDemineur} from "../../../js/Scoreboard.js";
import AchievementUtils from "../../../js/AchievementUtils.js";
import {VolumeDemineur} from "../../../js/Volume.js";

const account = JSON.parse(sessionStorage.getItem("account"));

/**
 * La grille de jeu. Contient toutes les fonctionnalités qui permettent de jouer au démineur.
 */
export class Grid {
    _firstClick = true;
    _isClicked = false;
    _middleClicked = false;
    _difficulty = "facile";
    _noFlags = true;

    constructor(gameBoard, numberRows, numberColumns, numberMines, difficulty) {
        this._victory = false;
        this._miningGrid = document.createElement("table");
        this._miningGrid.id = "miningGrid";
        this.difficulty = difficulty;
        this._nbCellulesRevelee = 0;

        VolumeDemineur.init();

        this.timer = new Timer();
        this.minesCounter = new MineCounter();
        Smiley.initialiserListeners(this);

        this._numberMines = numberMines;
        this.cells = [];

        this.creerGrid(numberRows, numberColumns);
        this.ajouterListeners();
    }

    get miningGrid() {
        return this._miningGrid;
    }

    get difficulty() {
        return this._difficulty;
    }

    set difficulty(difficulty) {
        this._difficulty = difficulty;
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
     * Affiche la cellule à la position (row, col). Effectue la gestion des mines et des cases vides
     * @param row la ligne de la cellule à afficher
     * @param col la colonne de la cellule à afficher
     */
    afficherCellule(row, col) {
        let cell = this.cells[row][col];

        // N'affiche pas des cellules déjà visible
        if (cell.visible) return;
        cell.afficheCellule();
        this._nbCellulesRevelee += 1;

        if (cell.isMine()) {
            this.gameOver(cell);
            return;
        }

        if (this._nbCellulesRevelee === this.cells.length * this.cells[0].length - this._numberMines) {
            if (!this._victory) this.victory();
        }

        if (cell.valeur === 0) {
            VolumeDemineur.playZero();
            this.decouvrirZeros(row, col)
        } else {
            VolumeDemineur.playClick();
        }
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
                    if (cell.visible || cell.disabled) return;
                    this._noFlags = false;

                    if (cell.flag) {
                        VolumeDemineur.playRemoveFlag();
                        cell.removeFlag();
                        this.minesCounter.incrementMineCounter();
                    } else {
                        VolumeDemineur.playPlaceFlag();
                        cell.addFlag();
                        this.minesCounter.decrementMineCounter();
                    }
                });

                // Le double clique effectue la meme action que le clique du milieu
                cell.element.addEventListener("dblclick", (e) => {
                    e.preventDefault();
                    if (cell.disabled) return;
                    if (cell.visible) this.decouvrirAlentours(i, j);
                });


                cell.element.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    if (cell.disabled) return;

                    // Presser le clique gauche preview la cellule
                    if (e.button === 0 && !cell.visible && !cell.flag) {
                        this._isClicked = true;
                        cell.element.classList.remove("unclicked");
                    }

                    // Presser le clique milieu preview les cellules autour
                    else if (e.button === 1) {
                        this._middleClicked = true;
                        this.previewCasesAutour(i, j);
                    }

                    Smiley.shock();
                });

                // Retirer la souris de la cellule enlève le preview
                cell.element.addEventListener("mouseout", (e) => {
                    e.preventDefault();
                    if (this._isClicked) {
                        cell.element.classList.add("unclicked");
                    }
                    else if (this._middleClicked) {
                        this.unPreviewCasesAutour(i, j);
                    }

                });

                // Passer la souris sur la cellule ajoute le preview
                cell.element.addEventListener("mouseover", (e) => {
                    e.preventDefault();
                    if (cell.disabled) return;
                    if (this._isClicked) {
                        cell.element.classList.remove("unclicked");
                    }
                    else if (this._middleClicked) {
                        this.previewCasesAutour(i, j);
                    }
                });

                cell.element.addEventListener("mouseup", (e) => {
                    e.preventDefault();
                    if (cell.disabled) return;
                    Smiley.normal();

                    // Clique du milieu affiche les cellules autour
                    if (this._middleClicked) {
                        this._middleClicked = false;
                        if (cell.visible) {
                            this.decouvrirAlentours(i, j);
                        }
                        this.unPreviewCasesAutour(i, j);
                    }

                    // Clique gauche affiche la case
                    else if (this._isClicked) {
                        this._isClicked = false;

                        // Le clique ne marche pas sur une cellule désactivée ou avec un drapeau
                        if (cell.flag || cell.visible) return;

                        // Au premier clique on initialise les mines et les valeurs
                        // Ceci permet de commencer une partie sans cliquer immédiatement sur une mine
                        if (this._firstClick) {
                            this._firstClick = false;

                            this.initialiserMines(this._numberMines, i, j);
                            this.initialiserValeurs();

                            this.minesCounter.initialiseMineCounter(this._numberMines);
                            this.timer.startTimer();
                        }

                        this.afficherCellule(i, j)
                    }
                });
            }
        }
    }

    /**
     * Ajoute un "preview" des cellules autour de la cellule
     * @param i la ligne de la cellule
     * @param j la colonne de la cellule
     */
    previewCasesAutour(i, j) {
        if (!this.cells[i][j].visible) this.cells[i][j].element.classList.remove("unclicked");
        for (let coord of this.coordonneesAutour(i, j)) {
            this.cells[coord[0]][coord[1]].element.classList.remove("unclicked");
        }
    }

    /**
     * Retire le "preview" des cellules autour de la cellule
     * @param i la ligne de la cellule
     * @param j la colonne de la cellule
     */
    unPreviewCasesAutour(i, j) {
        this.cells[i][j].element.classList.add("unclicked");
        for(let coord of this.coordonneesAutour(i, j)) {
            this.cells[coord[0]][coord[1]].element.classList.add("unclicked");
        }
    }

    /**
     * Affiche toutes les cellules autour de la cellule selectionnée si le nombre de drapeaux autour d'elle est égal à sa valeur.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     */
    decouvrirAlentours(row, col) {
        if (this.compterFlags(row, col) !== this.cells[row][col].valeur) return;
        for (let coord of this.coordonneesAutour(row, col)) {
            if (!this.cells[coord[0]][coord[1]].flag) this.afficherCellule(coord[0], coord[1]);
        }
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
        for (let coord of this.coordonneesAutour(row, col)) {
            if (this.cells[coord[0]][coord[1]].isMine()) nbMines++;
        }
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
        for (let coord of this.coordonneesAutour(row, col)) {
            if (this.cells[coord[0]][coord[1]].flag) nbFlags++;
        }
        return nbFlags;
    }

    /**
     * Affiche toutes les cellules vides groupées autour de la cellule, et affiche les cellules non vides autour d'elles.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     */
    decouvrirZeros(row, col) {
        for (let coord of this.canDisplayAutour(row, col)) {
            this.afficherCellule(coord[0], coord[1]);
        }
    }

    /**
     * Affiche toutes les mines. Désactive toutes les cellules.
     */
    victory() {
        this._victory = true;
        this.timer.stopTimer();
        VolumeDemineur.playVictory();
        Smiley.victory();
        this.mettreFlags();
        this.disableCells();

        // Verification des achievements et MAJ du tableau de scores
        if (account !== null) {
            AchievementUtils.increaseCounterAndTryUnlock(0, 1);
            AchievementUtils.increaseCounterAndTryUnlock(1, 1);
            AchievementUtils.increaseCounterAndTryUnlock(2, 1);
            AchievementUtils.increaseCounterAndTryUnlock(3, 1);
            AchievementUtils.increaseCounterAndTryUnlock(4, 1);

            switch (this.difficulty) {
                case "facile":
                    AchievementUtils.increaseCounterAndTryUnlock(5, 1);
                    break;
                case "moyen":
                    AchievementUtils.increaseCounterAndTryUnlock(6, 1);
                    break;
                case "difficile":
                    AchievementUtils.increaseCounterAndTryUnlock(7, 1);
                    break;
            }

            if (this._noFlags) AchievementUtils.increaseCounterAndTryUnlock(8, 1);

            if (this.timer.time <= 100) AchievementUtils.increaseCounterAndTryUnlock(9, 1);
            if (this.timer.time <= 50) AchievementUtils.increaseCounterAndTryUnlock(10, 1);
            if (this.timer.time <= 30) AchievementUtils.increaseCounterAndTryUnlock(11, 1);
            if (this.timer.time <= 15) AchievementUtils.increaseCounterAndTryUnlock(12, 1);

            this.updateScore(account.username, this.timer.time);
        }
    }

    /**
     * Affiche toutes les mines et les drapeaux mals placés. Désactive toutes les cellules. Affiche la mine cliquée en rouge.
     * @param mineCliquee
     */
    gameOver(mineCliquee) {
        this.timer.stopTimer();
        VolumeDemineur.playGameOver();
        Smiley.defeat();
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
     * Ajoute un drapeau sur toutes les cellules non cliquées.
     */
    mettreFlags() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];
                if (!cell.visible) {
                    cell.addFlag();
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
        let nbCols = this.cells[0].length - 1;
        let nbRows = this.cells.length - 1;
        let coordonnees = [];

        // Haut
        if (row > 0) {
            if (col > 0) coordonnees.push([row - 1, col - 1]);
            coordonnees.push([row - 1, col]);
            if (col < nbCols) coordonnees.push([row - 1, col + 1]);
        }

        // Cotes
        if (col > 0) coordonnees.push([row, col - 1]);
        if (col < nbCols) coordonnees.push([row, col + 1]);

        // Bas
        if (row < nbRows) {
            if (col > 0) coordonnees.push([row + 1, col - 1]);
            coordonnees.push([row + 1, col]);
            if (col < nbCols) coordonnees.push([row + 1, col + 1]);
        }
        return coordonnees;
    }

    /**
     * Retourne toutes les coordonnées autour de la cellule qui peuvent être affichées. Ne comprend pas les cellules sortant de la grille.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     * @returns {*[]} les coordonnées autour de la cellule qui peuvent être affichées
     */
    canDisplayAutour(row, col) {
        let coordonnees = this.coordonneesAutour(row, col);
        let newCoordonnees = [];
        for (let coord of coordonnees) {
            if (this.canDisplay(coord[0], coord[1])) {
                newCoordonnees.push(coord);
            }
        }
        return newCoordonnees;
    }

    /**
     * Renvoie si la cellule à la position (row, col) peut être affichée.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     * @returns {boolean} si la cellule peut être affichée
     */
    canDisplay(row, col) {
        return (!this.cells[row][col].visible && !this.cells[row][col].flag);
    }

    /**
     * Renvoie si la cellule à la position (row, col) est une mine.
     * @param row la ligne de la cellule
     * @param col la colonne de la cellule
     */
    cliqueCellule(row, col) {
        let cell = this.cells[row][col];
        if (cell.isMine()) this.gameOver(cell);
        else {
            this.afficherCellule(row, col);
            if (cell.valeur === 0) this.decouvrirZeros(row, col);
        }
    }

    /**
     * Désactive toutes les cellules de la grille.
     */
    disableCells() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j].disable();
            }
        }
    }

    /**
     * Met à jour le tableau de scores correspondant à la difficulté avec le nom et le score.
     * @param nom le username du compte connecté
     * @param score le score du joueur
     */
    updateScore(nom, score) {
        switch (this.difficulty) {
            case "facile":
                ScoreboardDemineur.updateFacile(nom, score);
                break;
            case "moyen":
                ScoreboardDemineur.updateMoyen(nom, score);
                break;
            case "difficile":
                ScoreboardDemineur.updateDifficile(nom, score);
                break;
        }
    }

    /**
     * Réinitialise la partie. Réinitialise le timer, le compteur de mines, et toutes les cellules.
     */
    reinitialiserPartie() {
        this._firstClick = true;
        this._victory = false;
        this._nbCellulesRevelee = 0;
        this.timer.stopTimer();
        this.timer.initialiseTimer();
        this.minesCounter.initialiseMineCounter(0);

        // Reinitialiser toutes les cellules
        for (let rows of this.cells) {
            rows.forEach((cell) => {
                cell.reinitialiserCellule();
            });
        }
    }

    /**
     * Arrête le timer.
     */
    stop() {
        this.timer.stopTimer();
        Smiley.normal();
    }
}