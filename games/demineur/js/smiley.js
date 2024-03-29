export class Smiley {


    constructor() {
        this.button = document.querySelector("#gameBoardHeaderSmileyButton");
        this.smiley = document.querySelector("#smiley");
        this._isClicked = false;
    }

    get isClicked() {
        return this._isClicked;
    }

    setClicked(value) {
        this._isClicked = value;
    }

    initialiserListeners(grid) {
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            this.normal();
            this.setClicked(false);
            grid.reinitialiserPartie();
        });

        this.button.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.button.classList.add("pressed");
            this.setClicked(true);
        });

        this.button.addEventListener("mouseup", (e) => {
           e.preventDefault();
              this.button.classList.remove("pressed");
              this.setClicked(false)
        });

        this.button.addEventListener("mouseout", (e) => {
            e.preventDefault();
            this.button.classList.remove("pressed");
        });

        this.button.addEventListener("mouseover", (e) => {
            e.preventDefault();
            if(this.isClicked) this.button.classList.add("pressed");
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