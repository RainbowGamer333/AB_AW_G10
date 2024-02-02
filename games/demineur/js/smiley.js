export class Smiley {


    constructor() {
        this.button = document.querySelector("#gameBoardHeaderSmileyButton");
        this.smiley = document.querySelector("#smiley");
        this._isClicked = false;
    }

    get isClicked() {
        return this._isClicked;
    }

    set isClicked(value) {
        this._isClicked = value;
    }

    initialiserListeners(grid) {
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            grid.reinitialiserPartie();
            this.normal();
        });

        this.button.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.button.classList.add("pressed");
        });

        this.button.addEventListener("mouseout", (e) => {
            e.preventDefault();
            this.button.classList.remove("pressed");
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