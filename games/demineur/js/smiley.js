export class Smiley {


    constructor() {
        this.button = document.querySelector("#gameBoardHeaderSmileyButton");
        this.smiley = document.querySelector("#smiley");
    }

    initialiserListeners(grid) {
        this.button.addEventListener("click", () => {
            grid.reinitialiserPartie();
            this.normal();
        });
    }

    normal() {
        this.smiley.src = "assets/header/normal.png";
    }

    shock() {
        this.smiley.src = "assets/header/shock.png";
    }

    defeat() {
        this.smiley.src = "assets/header/defeat.png";
    }

    victory() {
        this.smiley.src = "assets/header/victory.png";
    }
}