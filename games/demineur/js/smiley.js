/**
 * Classe représentant le smiley du jeu. Effectue les actions de changement de visage du smiley.
 */
export class Smiley {
    static button = document.querySelector("#gameBoardHeaderSmileyButton");
    static smiley = document.querySelector("#smiley");
    static _isClicked = false;
    static _theme = "retro";
    static _src = `./asset/themes/${Smiley._theme}/header`;

    static get isClicked() {
        return Smiley._isClicked;
    }

    static get src() {
        return Smiley._src;
    }

    static set src(src) {
        Smiley._src = src;
    }

    static set theme(theme) {
        Smiley._theme = theme;
        Smiley._src = `./asset/themes/${theme}/header`;

        //On change le thème en gardant l'instance actuelle du smiley
        let newsrc = Smiley.smiley.src.split("/");
        let face = newsrc[newsrc.length-1];
        Smiley.smiley.src = `${Smiley._src}/${face}`;
    }


    static setClicked(value) {
        Smiley._isClicked = value;
    }

    /**
     * Initialise les listeners du bouton smiley.
     * @param grid La grille de jeu
     */
    static initialiserListeners(grid) {
        Smiley.button.addEventListener("click", (e) => {
            e.preventDefault();
            Smiley.normal();
            Smiley.setClicked(false);
            grid.reinitialiserPartie();
        });

        Smiley.button.addEventListener("mousedown", (e) => {
            e.preventDefault();
            Smiley.button.classList.add("pressed");
            Smiley.setClicked(true);
        });

        Smiley.button.addEventListener("mouseup", (e) => {
           e.preventDefault();
              Smiley.button.classList.remove("pressed");
              Smiley.setClicked(false)
        });

        Smiley.button.addEventListener("mouseout", (e) => {
            e.preventDefault();
            Smiley.button.classList.remove("pressed");
        });

        Smiley.button.addEventListener("mouseover", (e) => {
            e.preventDefault();
            if(Smiley.isClicked) Smiley.button.classList.add("pressed");
        });
    }


    static normal() {
        Smiley.smiley.src = `${Smiley.src}/normal.png`;
    }

    static shock() {
        Smiley.smiley.src = `${Smiley.src}/shock.png`;
    }

    static defeat() {
        Smiley.smiley.src = `${Smiley.src}/defeat.png`;
    }

    static victory() {
        Smiley.smiley.src = `${Smiley.src}/victory.png`;
    }
}