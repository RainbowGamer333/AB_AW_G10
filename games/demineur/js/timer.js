export class Timer {

    interval;
    time;
    src = "./assets/header/timer";

    constructor() {
        this.timer = document.getElementById("gameBoardHeaderTime");
        this.timerUnit = document.createElement("img");
        this.timerTens = document.createElement("img");
        this.timerHundreds = document.createElement("img");

        this.setBackground();

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

    setBackground() {
        this.timerHundreds.style.backgroundImage = "url('" + this.src + "Background.png')";
        this.timerTens.style.backgroundImage = "url('" + this.src + "Background.png')";
        this.timerUnit.style.backgroundImage = "url('" + this.src + "Background.png')";
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