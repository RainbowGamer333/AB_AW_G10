import {TowerButton} from "./TowerButton.js";
import {Global} from "../constants/Global.js";

export class Gui {
     towerButtons = [];
     coinElement = null;
     scoreElement = null;

     constructor() {
         let buttons = document.getElementsByClassName("towerButton");

         for (let i = 0; i < buttons.length; i++) {
             this.towerButtons.push( new TowerButton(buttons[i]));
         }

         this.coinElement = document.getElementById("coin_card_value");
         this.scoreElement = document.getElementById("score_card_value");
     }


     update(dt){
        for (let i=0; i<this.towerButtons.length; i++){
            this.towerButtons[i].update(dt);
        }

        this.coinElement.textContent = Global.coinBalance;
        this.scoreElement.textContent = Global.score;
     }


     static init(){

    }

    static getCanvasMouseCoordinates(){
        const mouseX = event.clientX - Global.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - Global.canvas.getBoundingClientRect().top;

        // Ajuster les coordonnées en fonction de la différence de taille entre le canvas HTML et le canvas en pixels
        const scaleX = Global.canvas.width / Global.canvas.clientWidth;
        const scaleY = Global.canvas.height / Global.canvas.clientHeight;
        const adjustedMouseX = mouseX * scaleX;
        const adjustedMouseY = mouseY * scaleY;
        return {
            x: adjustedMouseX,
            y: adjustedMouseY
        };
    }
}