export class Smiley {


    constructor() {
        this.button = document.querySelector("#gameBoardHeaderSmileyButton");
        this.button.id = "buttonSmiley";
        //this.button.classList.add("unclicked");

        this.smiley = document.createElement("img");
        this.smiley.id = "smiley";
        //this.button.appendChild(this.smiley);
    }
}