import {TowerButton} from "./TowerButton.js";

export class Gui {
     towerButtons = [];

     constructor() {
         let buttons = document.getElementsByClassName("towerButton");

         for (let i = 0; i < buttons.length; i++) {
             let towerButton = new TowerButton(buttons[i]);
         }
     }


     update(dt){
        for (let i=0; i<this.towerButtons.length; i++){
            (this.towerButtons)[i].update(dt);
        }
     }


     static init(){

    }
}