export class MineCounter {

    src = "./assets/header/timer";
    mines = 0;

    constructor() {
        this.mineCounter = document.getElementById("gameBoardHeaderMineCounter");
        this.mineCounterUnit = document.createElement("img");
        this.mineCounterTens = document.createElement("img");
        this.mineCounterHundreds = document.createElement("img");

        this.setBackground();

        this.mineCounter.appendChild(this.mineCounterHundreds);
        this.mineCounter.appendChild(this.mineCounterTens);
        this.mineCounter.appendChild(this.mineCounterUnit);

        this.displayMineCounter();
    }

    setBackground() {
        this.mineCounterHundreds.style.backgroundImage = "url('" + this.src + "Background.png')";
        this.mineCounterTens.style.backgroundImage = "url('" + this.src + "Background.png')";
        this.mineCounterUnit.style.backgroundImage = "url('" + this.src + "Background.png')";
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