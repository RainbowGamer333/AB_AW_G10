import {TowerButton} from "./TowerButton.js";
import {Engine} from "../constants/Engine.js";

export class Gui {
     towerButtons = [];
     coinElement = null;
     scoreElement = null;
     villageElement = null;

     constructor() {
         let buttons = document.getElementsByClassName("towerButton");

         for (let i = 0; i < buttons.length; i++) {
             this.towerButtons.push( new TowerButton(buttons[i]));
         }

         this.coinElement = document.getElementById("coin_card_value");
         this.scoreElement = document.getElementById("score_card_value");
         this.villageElement = document.getElementById("village_card_value");
     }


     update(dt){
        for (let i=0; i<this.towerButtons.length; i++){
            this.towerButtons[i].update(dt);
        }


        //TODO DO EVENT NOT UPDATE !
        this.coinElement.textContent = Engine.coinBalance;
        this.scoreElement.textContent = Engine.score;

        this.villageElement.textContent =  Math.trunc(Engine.villageHealth/Engine.maxVillageHealth*100)+"%";
     }


     static init(){

    }

    static getCanvasMouseCoordinates(){
        const mouseX = event.clientX - Engine.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - Engine.canvas.getBoundingClientRect().top;

        // Ajuster les coordonnées en fonction de la différence de taille entre le canvas HTML et le canvas en pixels
        const scaleX = Engine.canvas.width / Engine.canvas.clientWidth;
        const scaleY = Engine.canvas.height / Engine.canvas.clientHeight;
        const adjustedMouseX = mouseX * scaleX;
        const adjustedMouseY = mouseY * scaleY;
        return {
            x: adjustedMouseX,
            y: adjustedMouseY
        };
    }
}