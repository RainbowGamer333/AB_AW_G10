export class MineCounter {

    src = "./assets/header/timer";
    mines = 0;

    constructor() {
        this.mineCounterUnit = document.querySelector("#mineU");
        this.mineCounterTens = document.querySelector("#mineT");
        this.mineCounterHundreds = document.querySelector("#mineH");

    }

    initialiseMineCounter(nbMines) {
        this.mines = nbMines;
        this.displayMineCounter();
    }

    incrementMineCounter() {
        if (this.mines < 999) this.mines++;
        this.displayMineCounter();
    }

    decrementMineCounter() {
        if (this.mines > 0) this.mines--;
        this.displayMineCounter();
    }

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