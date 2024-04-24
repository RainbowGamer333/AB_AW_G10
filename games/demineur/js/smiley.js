export class Smiley {
    button;
    smiley;
    _isClicked;
    _theme;
    _src;

    constructor() {
        this.button = document.querySelector("#gameBoardHeaderSmileyButton");
        this.smiley = document.querySelector("#smiley");
        this._isClicked = false;
        this.theme = "retro";
    }

    get isClicked() {
        return this._isClicked;
    }

    set theme(theme) {
        this._theme = theme;
        this._src = `./asset/themes/${theme}/header/`;
    }

    setClicked(value) {
        this._isClicked = value;
    }

    /**
     * Initialise les listeners du bouton smiley.
     * @param grid La grille de jeu
     */
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
        this.smiley.src = `${this._src}/normal.png`;
    }

    shock() {
        this.smiley.src = `${this._src}/shock.png`;
    }

    defeat() {
        this.smiley.src = `${this._src}/defeat.png`;
    }

    victory() {
        this.smiley.src = "asset/header/victory.png";
    }
}