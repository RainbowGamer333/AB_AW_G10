import {Path} from "../constants/Path.js";
import {Gui} from "./Gui.js";
import {Global} from "../constants/Global.js";
import {Canon} from "../entity/impl/tower/Canon.js";
import {Constants} from "../constants/Constants.js";
import {LightningTower} from "../entity/impl/tower/LightningTower.js";
// import {Constants} from "../constants/Constants.js";
let isDragging = false;
let draggedButton = null;
let offsetX, offsetY;

export class TowerButton{
    buttonID;
    domElement;


    constructor(element){
        this.domElement = element;
        this.buttonID = element.id.substring(3);
        //console.log("create : " + orignalId);


        //Add texture
        let imagePath = Path.BASE_PATH_TOWER+this.buttonID+".png";
        this.domElement.querySelector("img").src =imagePath ;

        // this.domElement.style.backgroundImage = `url(${imagePath})`;


        //Add listeners
        this.stopDrag = this.stopDrag.bind(this);
        this.createTower = this.createTower.bind(this);
        element.addEventListener("click",this.handleClick.bind(this));
        element.addEventListener("mousedown", this.startDrag.bind(this));
        Global.canvas.addEventListener("mouseup", this.stopDrag.bind(this));
    }


     handleClick(){
        console.log("clicked "+this.buttonID);
    }



    createTower(){
        console.log("create : "+this.buttonID)
        switch (this.buttonID){
            case "canon": return new Canon();
            case "lightning_tower": return new LightningTower();
            default : return new Canon();
        }
    }

     startDrag(event) {
        draggedButton = this.domElement;
        const offsetX = event.clientX - draggedButton.getBoundingClientRect().left;
        const offsetY = event.clientY - draggedButton.getBoundingClientRect().top;

        draggedButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    stopDrag() {
        if (draggedButton) {
            draggedButton.style.transform = "translate(0, 0)";


            const mouseCoordinates = Gui.getCanvasMouseCoordinates();
            if (mouseCoordinates.x>=0 && mouseCoordinates.x<=Constants.width //Check if mouse coordinates are within canvas bounds
                && mouseCoordinates.y>=0 && mouseCoordinates.y<=Constants.height){
                console.log("stop drag : "+this.buttonID)
                let gameObject = this.createTower();
                gameObject.x = mouseCoordinates.x;
                gameObject.y = mouseCoordinates.y;
                const col = gameObject.getColumn();
                const line = gameObject.getLine();

                if (line < Constants.rows-1){ //Can't place to last tine
                    gameObject.x = col * Constants.TILE_SIZE_ZOOMED ;
                    gameObject.y = line * Constants.TILE_SIZE_ZOOMED;
                    console.log("Placing at x:"+gameObject.x +" y:"+gameObject.y)
                    Global.addGameObject(gameObject);
                }
            }
            // console.log("End drag x:"+mouseCoordinates.x+" y:"+mouseCoordinates.y);
            draggedButton = null;
        }
    }

}


function drag(event) {
    if (draggedButton) {
        const x = event.clientX - draggedButton.offsetWidth / 2;
        const y = event.clientY - draggedButton.offsetHeight / 2;

        // draggedButton.style.left = `${x}px`;
        // draggedButton.style.top = `${y}px`;
        // console.log("draging")
    }
}




document.addEventListener("mousemove", drag);


