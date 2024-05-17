import {Path} from "../constants/Path.js";
import {Gui} from "./Gui.js";
import {Engine} from "../constants/Engine.js";
import {Canon} from "../entity/impl/tower/Canon.js";
import {Constants} from "../constants/Constants.js";
import {LightningTower} from "../entity/impl/tower/LightningTower.js";
import {Wall} from "../entity/impl/tower/Wall.js";
import {GoldenTree} from "../entity/impl/tower/GoldenTree.js";
import {Annihilator} from "../entity/impl/tower/Annihilator.js";
import {FireCanon} from "../entity/impl/tower/FireCanon.js";
import {LowWall} from "../entity/impl/tower/LowWall.js";
import {Landmine} from "../entity/impl/tower/Landmine.js";
import {MiniCanon} from "../entity/impl/tower/MiniCanon.js";
import {DoubleCanon} from "../entity/impl/tower/DoubleCanon.js";
import {Wind} from "../entity/impl/tower/Wind.js";
import {IceCanon} from "../entity/impl/tower/IceCanon.js";
import TDAchievementConstant from "../achievement/TDAchievementConstant.js";
import AchievementUtils from "../../../../js/AchievementUtils.js";
import TowerRemover from "../entity/impl/generic/TowerRemover.js";
// import {Constants} from "../constants/Constants.js";

let draggedButton = null;
let draggedButtonX = 0;
let draggedButtonY = 0;
let draggingElement = null;


//Represent a "card" or "towerButton" which can be dragged to the world to place a tower.
export class TowerButton{
    buttonID;
    domElement;
    price;
    isSpecial ;


    constructor(element,isSpacial){
        this.domElement = element;
        this.buttonID = element.id.substring(3);
        this.isSpecial = isSpacial;



        // Add texture
        let imagePath = Path.BASE_PATH_TOWER + this.buttonID + ".png";
        this.domElement.querySelector("img").src = imagePath;
        this.price = element.querySelector(".cost").innerText;
        // console.log(this.price)

        // Add listeners
        // this.stopDrag = this.stopDrag.bind(this);
        // this.createTower = this.createTower.bind(this);
        // this.drag = this.drag.bind(this);
        document.addEventListener("mousemove", drag);
        // element.addEventListener("click", this.handleClick.bind(this));
        element.addEventListener("mousedown", (event) => {
           startDrag(event,this);
        });
        // element.addEventListener("mousedown",this.handleClick);
        document.addEventListener("mouseup", (event) => {
            stopDrag(event,this);
        });
    }


     handleClick(){
        // console.log("clicked "+this.buttonID);
    }


    //return the right type of tower
    createTower(){
        // console.log("create : "+this.buttonID)
        switch (this.buttonID){ //todo put values in variables
            case "mini_canon" : return new MiniCanon();
            case "double_canon": return new DoubleCanon();
            case "canon": return new Canon();
            case "fire_canon" : return new FireCanon();
            case "tesla": return new LightningTower();
            case "landmine": return new Landmine();
            case "wall" : return new Wall();
            case "low_wall" : return new LowWall();
            case "golden_tree" : return new GoldenTree();
            case "annihilator": return new Annihilator();
            case "ice_canon" : return new IceCanon();
            case "spell_wind" : return new Wind();
            default : return new MiniCanon();
        }
    }


    //Handling special "cards"
    handleSpecial(mouseCoordinates){
        console.log("create : "+this.buttonID)
        switch (this.buttonID){ //todo put values in variables
            case "remover" : {
                const towerRemover = new TowerRemover(mouseCoordinates.x,mouseCoordinates.y);
                Engine.coinBalance -= this.price;
                return;
            }
            case "annihilator":{

                const annihilator = new Annihilator();
                const clippedX = Math.trunc(mouseCoordinates.x / Constants.TILE_SIZE_ZOOMED) * Constants.TILE_SIZE_ZOOMED;
                annihilator.x = clippedX;
                annihilator.y = Constants.TILE_SIZE_ZOOMED * (Constants.rows+1);
                Engine.coinBalance -= this.price;
                AchievementUtils.increaseCounterAndTryUnlock(TDAchievementConstant.SPEND_MONEY,this.price);
                Engine.addGameObject(annihilator);
                return;
            }
            case "spell_wind":{ //TODO Bad duplication
                const wind = new Wind();
                const clippedX = Math.trunc(mouseCoordinates.x / Constants.TILE_SIZE_ZOOMED) * Constants.TILE_SIZE_ZOOMED;
                wind.x = clippedX;
                wind.y = Constants.TILE_SIZE_ZOOMED * (Constants.rows+1);
                Engine.coinBalance -= this.price;
                AchievementUtils.increaseCounterAndTryUnlock(TDAchievementConstant.SPEND_MONEY,this.price);
                Engine.addGameObject(wind);
                return;
            }
            default : return;
        }
    }

    update(dt){ //todo could be set with listener instead of updating every frame !
        this.domElement.disabled = this.price > Engine.coinBalance;
    }


}

//Start the dragging of a card
function startDrag(event,towerButton) {
    if (towerButton.price > Engine.coinBalance){
        console.log("Not enough coins");
        return;
    }

    draggedButton = towerButton.domElement;
    draggingElement = towerButton;
    draggedButtonX =  draggedButton.getBoundingClientRect().left;
    draggedButtonY =  draggedButton.getBoundingClientRect().top;
    // console.log("TOP:"+draggedButton.getBoundingClientRect().top, "LEFT:"+draggedButton.getBoundingClientRect().left);
    draggedButton.style.transform = `translate(${0}px, ${0}px)`;
}

//drag the card and keep tracking of it
function drag(event) {
    // console.log("drag")
    if (draggedButton) {
        const mooseCoordinate = Gui.getMouseCoordinates();
        draggedButton.style.transform = `translate(${mooseCoordinate.x-draggedButtonX}px, ${mooseCoordinate.y-draggedButtonY}px)`;
    }
}

//Stop dragging
function stopDrag(event) {
    if (draggedButton && draggingElement) {
        let towerButton = draggingElement;
        if (towerButton.price > Engine.coinBalance){
            console.log("Not enough coins");
            draggedButton = null;
            draggingElement = null;
            return;
        }

        draggedButton.style.position = `static`;
        draggedButton.style.transform = "translate(0, 0)";

        const mouseCoordinates = Gui.getCanvasMouseCoordinates();
        if (mouseCoordinates.x>=0 && mouseCoordinates.x<=Constants.width //Check if mouse coordinates are within canvas bounds
            && mouseCoordinates.y>=0 && mouseCoordinates.y<=Constants.height){
            // console.log("stop drag : "+towerButton.buttonID)


            //Test if special
            if (towerButton.isSpecial){
                // let gameObject = towerButton.createSpecial();
                towerButton.handleSpecial(mouseCoordinates);

            }else{//Not special
                let gameObject = towerButton.createTower();
                gameObject.x = mouseCoordinates.x;
                gameObject.y = mouseCoordinates.y;
                const col = gameObject.getColumn();
                const line = gameObject.getLine();

                //Coordinates clipping
                gameObject.x = col * Constants.TILE_SIZE_ZOOMED ;
                gameObject.y = line * Constants.TILE_SIZE_ZOOMED;

                if ( Engine.isTileFree(gameObject.x,gameObject.y)){ //Can't place a tower  on the top of another.

                    console.log("Placing at x:"+gameObject.x +" y:"+gameObject.y)
                    Engine.addGameObject(gameObject);
                    Engine.coinBalance -= towerButton.price;
                    AchievementUtils.increaseCounterAndTryUnlock(TDAchievementConstant.SPEND_MONEY,towerButton.price);
                }
            }
        }
        // console.log("End drag x:"+mouseCoordinates.x+" y:"+mouseCoordinates.y);
        draggedButton = null;
        draggingElement = null;
    }
}











