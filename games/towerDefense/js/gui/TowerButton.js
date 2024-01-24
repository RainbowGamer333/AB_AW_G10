import {Path} from "../constants/Path.js";
import {Gui} from "./Gui.js";
import {Global} from "../constants/Global.js";
import {Canon} from "../entity/impl/tower/Canon.js";
import {Constants} from "../constants/Constants.js";
import {LightningTower} from "../entity/impl/tower/LightningTower.js";
import {Wall} from "../entity/impl/tower/Wall.js";
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


    constructor(element){
        this.domElement = element;
        this.buttonID = element.id.substring(3);

        // Add texture
        let imagePath = Path.BASE_PATH_TOWER + this.buttonID + ".png";
        this.domElement.querySelector("img").src = imagePath;
        this.price = element.querySelector(".cost").innerText;

        // Add listeners
        // this.stopDrag = this.stopDrag.bind(this);
        // this.createTower = this.createTower.bind(this);
        // this.drag = this.drag.bind(this);
        document.addEventListener("mousemove", this.drag);
        // element.addEventListener("click", this.handleClick.bind(this));
        element.addEventListener("mousedown", (event) => {
           startDrag(event,this);
        });
        // element.addEventListener("mousedown",this.handleClick);
        Global.canvas.addEventListener("mouseup", (event) => {
            stopDrag(event,this);
        });
    }


     handleClick(){
        console.log("clicked "+this.buttonID);
    }



    createTower(){
        console.log("create : "+this.buttonID)
        switch (this.buttonID){
            case "canon": return new Canon();
            case "lightning_tower": return new LightningTower();
            case "wall" : return new Wall();
            default : return new LightningTower();
        }
    }

    update(dt){ //todo could be set with listener instead of updating every frame !
        this.domElement.disabled = this.price > Global.coinBalance;
    }


}

function startDrag(event,towerButton) {
    if (towerButton.price > Global.coinBalance){
        console.log("Not enough coins");
        return;
    }

    draggedButton = towerButton.domElement;
    draggingElement = towerButton;
    const offsetX = event.clientX - draggedButton.getBoundingClientRect().left;
    const offsetY = event.clientY - draggedButton.getBoundingClientRect().top;

    draggedButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    console.log("start dragging "+towerButton.buttonID)
}

function drag(event) {
    if (draggedButton) {
        const x = event.clientX - draggedButton.offsetWidth / 2 - this.offsetX;
        const y = event.clientY - draggedButton.offsetHeight / 2 - this.offsetY;

        // draggedButton.style.left = `${x}px`;
        // draggedButton.style.top = `${y}px`;
        // console.log("draging")
    }
}

function stopDrag(event) {
    if (draggedButton && draggingElement) {
        let towerButton = draggingElement;
        if (towerButton.price > Global.coinBalance){
            console.log("Not enough coins");
            draggedButton = null;
            draggingElement = null;
            return;
        }
        draggedButton.style.transform = "translate(0, 0)";

        const mouseCoordinates = Gui.getCanvasMouseCoordinates();
        if (mouseCoordinates.x>=0 && mouseCoordinates.x<=Constants.width //Check if mouse coordinates are within canvas bounds
            && mouseCoordinates.y>=0 && mouseCoordinates.y<=Constants.height){
            console.log("stop drag : "+towerButton.buttonID)
            let gameObject = towerButton.createTower();
            gameObject.x = mouseCoordinates.x;
            gameObject.y = mouseCoordinates.y;
            const col = gameObject.getColumn();
            const line = gameObject.getLine();

            if (line < Constants.rows-1){ //Can't place to last tine
                gameObject.x = col * Constants.TILE_SIZE_ZOOMED ;
                gameObject.y = line * Constants.TILE_SIZE_ZOOMED;
                console.log("Placing at x:"+gameObject.x +" y:"+gameObject.y)
                Global.addGameObject(gameObject);
                Global.coinBalance -= towerButton.price;
            }
        }
        // console.log("End drag x:"+mouseCoordinates.x+" y:"+mouseCoordinates.y);
        draggedButton = null;
        draggingElement = null;
    }
}









