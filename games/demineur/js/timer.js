export class Timer {

    interval;
    time;
    src = "./assets/timer/timer";

    constructor() {
        this.timer = document.getElementById("gameBoardHeaderTime");
        this.timerUnit = document.createElement("img");
        this.timerTens = document.createElement("img");
        this.timerHundreds = document.createElement("img");

        this.timer.appendChild(this.timerHundreds);
        this.timer.appendChild(this.timerTens);
        this.timer.appendChild(this.timerUnit);

        this.initialiseTimer();
        this.displayTimer();
    }


    initialiseTimer() {
        this.time = 0;
        this.displayTimer();
    }

    startTimer() {
        console.log("starting timer");
        this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        if (this.time < 999) this.time++;
        this.displayTimer();
    }

    stopTimer() {
        console.log("stopping timer");
        clearInterval(this.interval);
    }

    displayTimer() {
        let hundreds = Math.floor(this.time / 100);
        let tens = Math.floor((this.time - hundreds * 100) / 10);
        let unit = this.time - (hundreds * 100) - (tens * 10);

        this.timerHundreds.src = this.src + hundreds + ".png";
        this.timerTens.src = this.src + tens + ".png";
        this.timerUnit.src = this.src + unit + ".png";
    }

}