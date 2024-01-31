export class Smiley {


    constructor() {
        this.button = document.querySelector("#gameBoardHeaderSmileyButton");
        this.button.id = "buttonSmiley";
    }

    initialiserListeners(grid) {
        this.button.addEventListener("click", () => {
            grid.reinitialiserPartie();
        });
    }
}