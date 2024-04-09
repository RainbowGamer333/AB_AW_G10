export class MineCounter {

    src = "./asset/header/timer";
    mines = 0;
    minesOffset = 0;

    constructor() {
        this.mineCounterUnit = document.querySelector("#mineU");
        this.mineCounterTens = document.querySelector("#mineT");
        this.mineCounterHundreds = document.querySelector("#mineH");
        this.initialiseMineCounter(0);
    }

    /**
     * Initialise le compteur au nombre de mines.
     * @param nbMines Nombre de mines
     */
    initialiseMineCounter(nbMines) {
        this.mines = nbMines;
        this.displayMineCounter();
    }

    /**
     * Incrémente le compteur de 1 tant qu'il est inférieur à 999.
     */
    incrementMineCounter() {
        if (this.minesOffset > 0) this.minesOffset--;
        else if (this.mines < 999) this.mines++;

        this.displayMineCounter();
    }

    /**
     * Décrémente le compteur de 1 tant qu'il est supérieur à 0.
     */
    decrementMineCounter() {
        if (this.mines > 0) this.mines--;
        else this.minesOffset++;
        this.displayMineCounter();
    }

    /**
     * Affiche le compteur de mines.
     */
    displayMineCounter() {
        let minesDisplay;

        if (this.mines < 0) minesDisplay = "0";
        else if (this.mines > 999) minesDisplay = "999";
        else minesDisplay = String(this.mines).padStart(3, "0");

        this.mineCounterHundreds.src = this.src + minesDisplay[0] + ".png";
        this.mineCounterTens.src = this.src + minesDisplay[1] + ".png";
        this.mineCounterUnit.src = this.src + minesDisplay[2] + ".png";
    }
}