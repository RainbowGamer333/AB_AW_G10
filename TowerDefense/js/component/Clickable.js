import {Component} from "./Component.js";
import {Global} from "../constants/Global.js";
import {Constants} from "../constants/Constants.js";

export class Clickable extends Component{
    constructor() {
        super();
        Global.canvas.addEventListener("click",this.handleClick.bind(this));
    }

    handleClick(){
        const mouseX = event.clientX - Global.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - Global.canvas.getBoundingClientRect().top;

        // Ajuster les coordonnées en fonction de la différence de taille entre le canvas HTML et le canvas en pixels
        const scaleX = Global.canvas.width / Global.canvas.clientWidth;
        const scaleY = Global.canvas.height / Global.canvas.clientHeight;
        const adjustedMouseX = mouseX * scaleX;
        const adjustedMouseY = mouseY * scaleY;

        // Vérifier quel sprite a été cliqué

        if (
            adjustedMouseX >= this.parent.x &&
            adjustedMouseX <= this.parent.x + Constants.TILE_SIZE_ZOOMED &&
            adjustedMouseY >= this.parent.y &&
            adjustedMouseY <= this.parent.y + Constants.TILE_SIZE_ZOOMED
        ) {
            console.log("Sprite cliqué :"+this.parent.name+ " x: "+this.parent.x+" y: "+this.parent.y);
            // Faites quelque chose avec le sprite cliqué

        }

        // console.log(this.parent.name+" clicked");
    }
}