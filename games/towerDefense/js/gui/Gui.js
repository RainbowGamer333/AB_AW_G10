import {TowerButton} from "./TowerButton.js";
import {Engine} from "../constants/Engine.js";
import {Path} from "../constants/Path.js";
import {Utils} from "../utils/Utils.js";

export class Gui {
     towerButtons = [];
     coinElement = null;
     scoreElement = null;
     villageElement = null;

     constructor() {
         let buttons = document.getElementsByClassName("towerButton");

         let rightContainer = document.getElementById("right-container");
         let leftContainer = document.getElementById("left-container");

         // for (let i = 0; i < buttons.length; i++) {
         //     this.towerButtons.push( new TowerButton(buttons[i]));
         // }


         Utils.readTextFile(Path.TOWERS_DATA, function(text){
             let dataArray = JSON.parse(text);
             for (let i = 0; i < dataArray.length; i++){
                 let towerButtonElement = dataArray[i];
                 //this.towerButtons.push()
                 const name = towerButtonElement.name;
                 const displayName = towerButtonElement.display_name;
                 const cost = towerButtonElement.price;
                 const element = Utils.fromHTML(" <button class=\"towerButton\" id=\"tb_"+name+"\">\n" +
                     "                <span class=\"title\">"+displayName+"</span>\n" +
                     "                <img src=\"asset/placeholder.png\" alt=\"placeholder\">\n" +
                     "                <span class=\"cost\">"+cost+"</span>\n" +
                     "            </button>")


                 if (towerButtonElement.isSpecial){
                     leftContainer.appendChild(element);
                 }else{
                     rightContainer.appendChild(element);
                 }
                 const buttonElement = new TowerButton(element);
                 // this.towerButtons.push( buttonElement); //TODO ENABLE THIS
             }

             console.log(dataArray);
         });

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