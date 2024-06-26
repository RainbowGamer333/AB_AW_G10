import {Component} from "./Component.js";
import {Engine} from "../constants/Engine.js";
import {Constants} from "../constants/Constants.js";
import {Gui} from "../gui/Gui.js";

//Component à ajouter un a GameObject permettant de rendre des éléments clickables
export class Clickable extends Component{
    constructor() {
        super();
        Engine.canvas.addEventListener("click",this.checkIfClicked.bind(this));
    }

    checkIfClicked(){
        const mouseCoordinates = Gui.getCanvasMouseCoordinates();
        const adjustedMouseX =mouseCoordinates.x;
        const adjustedMouseY = mouseCoordinates.y;

        // Vérifier quel sprite a été cliqué
        if (adjustedMouseX >= this.parent.x &&
            adjustedMouseX <= this.parent.x + Constants.TILE_SIZE_ZOOMED &&
            adjustedMouseY >= this.parent.y &&
            adjustedMouseY <= this.parent.y + Constants.TILE_SIZE_ZOOMED) {

            this.handleClick();
        }
    }

    handleClick(){
        // console.log("Sprite cliqué :"+this.parent.name+ " x: "+this.parent.x+" y: "+this.parent.y);

        this.parent.onClick();

    }
}