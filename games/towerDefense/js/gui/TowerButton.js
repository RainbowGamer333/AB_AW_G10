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
import {BidirectionalSonar} from "../entity/impl/tower/BidirectionalSonar.js";
import {Tower} from "../entity/Tower.js";
import {LowWall} from "../entity/impl/tower/LowWall.js";
import {Landmine} from "../entity/impl/tower/Landmine.js";
// import {Constants} from "../constants/Constants.js";
let isDragging = false;
let draggedButton = null;
let draggingElement = null;
let offsetX;
let offsetY;

export class TowerButton{
    buttonID;
    domElement;
    price;
    isSpecial;


    constructor(element,isSpacial){
        this.domElement = element;
        this.buttonID = element.id.substring(3);
        this.isSpecial = isSpacial;



        // Add texture
        let imagePath = Path.BASE_PATH_TOWER + this.buttonID + ".png";
        this.domElement.querySelector("img").src = imagePath;
        this.price = element.querySelector(".cost").innerText;
        console.log(this.price)

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
        console.log("clicked "+this.buttonID);
    }



    createTower(){
        console.log("create : "+this.buttonID)
        switch (this.buttonID){ //todo put values in variables
            case "canon": return new Canon();
            case "lightning_tower": return new LightningTower();
            case "landmine": return new Landmine();
            case "wall" : return new Wall();
            case "low_wall" : return new LowWall();
            case "golden_tree" : return new GoldenTree();
            case "annihilator": return new Annihilator();
            case "fire_canon" : return new FireCanon();
            case"bidirectional_sonar" : return new BidirectionalSonar();
            default : return new LightningTower();
        }
    }

    update(dt){ //todo could be set with listener instead of updating every frame !
        this.domElement.disabled = this.price > Engine.coinBalance;
    }


}

function startDrag(event,towerButton) {
    if (towerButton.price > Engine.coinBalance){
        console.log("Not enough coins");
        return;
    }

    draggedButton = towerButton.domElement;
    draggingElement = towerButton;
    const offsetX = event.clientX - draggedButton.getBoundingClientRect().left;
    const offsetY = event.clientY - draggedButton.getBoundingClientRect().top;

    draggedButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    // console.log("start dragging "+towerButton.buttonID)
}

function drag(event) {
    // console.log("drag")
    if (draggedButton) {
        const mooseCoordinate = Gui.getCanvasMouseCoordinates();

        // draggedButton.style.position = `absolute`;
        // draggedButton.style.left = `${mooseCoordinate.x}px`;
        // draggedButton.style.top = `${mooseCoordinate.y}px`;
        // draggedButton.style.transform = `translate(${mooseCoordinate.x}px, ${mooseCoordinate.y}px)`;
        // console.log(`translate(${mooseCoordinate.x}px, ${mooseCoordinate.y}px)`)
        // console.log("draging")
    }
}

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
            let gameObject = towerButton.createTower();
            gameObject.x = mouseCoordinates.x;
            gameObject.y = mouseCoordinates.y;
            const col = gameObject.getColumn();
            const line = gameObject.getLine();

            //line < Constants.rows-1 &&
            gameObject.x = col * Constants.TILE_SIZE_ZOOMED ;
            gameObject.y = line * Constants.TILE_SIZE_ZOOMED;
            if ( Engine.isTileFree(gameObject.x,gameObject.y)){ //Can't place to last tine

                console.log("Placing at x:"+gameObject.x +" y:"+gameObject.y)
                Engine.addGameObject(gameObject);
                Engine.coinBalance -= towerButton.price;
            }
        }
        // console.log("End drag x:"+mouseCoordinates.x+" y:"+mouseCoordinates.y);
        draggedButton = null;
        draggingElement = null;
    }
}











