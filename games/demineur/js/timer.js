export class Timer {

    interval;
    time;
    src = "./assets/header/timer";

    constructor() {
        this.timerUnit = document.querySelector("#timerU");
        this.timerTens = document.querySelector("#timerT");
        this.timerHundreds = document.querySelector("#timerH");
        this.initialiseTimer();
    }


    initialiseTimer() {
        this.time = 0;
        this.displayTimer();
    }

    startTimer() {
        console.log("starting header");
        this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        if (this.time < 999) this.time++;
        this.displayTimer();
    }

    stopTimer() {
        console.log("stopping header");
        clearInterval(this.interval);
    }

    displayTimer() {
        let minesDisplay = String(this.time).padStart(3, "0");

        this.timerHundreds.src = this.src + minesDisplay[0] + ".png";
        this.timerTens.src = this.src + minesDisplay[1] + ".png";
        this.timerUnit.src = this.src + minesDisplay[2] + ".png";
    }

}