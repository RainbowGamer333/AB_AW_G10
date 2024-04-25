export class Timer {

    interval;
    time;
    src = "./asset/themes/retro/header/timer";

    constructor() {
        this.timerUnit = document.querySelector("#timerU");
        this.timerTens = document.querySelector("#timerT");
        this.timerHundreds = document.querySelector("#timerH");
        this.initialiseTimer();
    }


    /**
     * Initialise le compteur à 0
     */
    initialiseTimer() {
        this.time = 0;
        this.displayTimer();
    }

    /**
     * Met à jour le compteur toutes les secondes
     */
    startTimer() {
        this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    /**
     * Incrémente le compteur de 1 tant qu'il est inférieur à 999.
     */
    updateTimer() {
        if (this.time < 999) this.time++;
        this.displayTimer();
    }

    /**
     * Arrête le compteur
     */
    stopTimer() {
        clearInterval(this.interval);
    }

    /**
     * Affiche le compteur
     */
    displayTimer() {
        let minesDisplay = String(this.time).padStart(3, "0");

        this.timerHundreds.src = this.src + minesDisplay[0] + ".png";
        this.timerTens.src = this.src + minesDisplay[1] + ".png";
        this.timerUnit.src = this.src + minesDisplay[2] + ".png";
    }

}