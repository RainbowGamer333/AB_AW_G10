import {TowerButton} from "./TowerButton.js";
import {Global} from "../constants/Global.js";

export class Gui {
     towerButtons = [];
     coinElement = null;

     constructor() {
         let buttons = document.getElementsByClassName("towerButton");

         for (let i = 0; i < buttons.length; i++) {
             let towerButton = new TowerButton(buttons[i]);
         }

         this.coinElement = document.getElementById("coin_card_value");
     }


     update(dt){
        for (let i=0; i<this.towerButtons.length; i++){
            (this.towerButtons)[i].update(dt);
        }

        this.coinElement.textContent = Global.coinBalance;
     }


     static init(){

    }
}