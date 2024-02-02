import {Component} from "./Component.js";
import {Constants} from "../constants/Constants.js";
import {Engine} from "../constants/Engine.js";

export class SpriteRenderer extends Component{
    texture;

    constructor(texture) {
        super();
        this.texture = texture;
    }

    update(dt){

    }

    render(){
        // console.log("draw")
        Engine.context.drawImage(this.texture, this.parent.x, this.parent.y, Constants.TILE_SIZE_ZOOMED, Constants.TILE_SIZE_ZOOMED);

        // this.ctx.fillStyle = "#b66b6b"; // Couleur du carré (blanc ici)
        // this.ctx.fillRect(this.parent.x, this.parent.y, 50, 50); // Paramètres : position x, position y, largeur, hauteur
    }
}