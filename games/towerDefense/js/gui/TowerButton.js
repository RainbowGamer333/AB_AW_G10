import {Path} from "../constants/Path.js";
import {Gui} from "./Gui.js";
import {Global} from "../constants/Global.js";
import {Canon} from "../entity/impl/tower/Canon.js";
import {Constants} from "../constants/Constants.js";
// import {Constants} from "../constants/Constants.js";
let isDragging = false;
let draggedButton = null;
let offsetX, offsetY;

export class TowerButton{
    buttonID;
    domElement;

    constructor(element){
        this.domElement = element;
        let orignalId = element.id.substring(3);
        this.buttonID = orignalId;
        //console.log("create : " + orignalId);


        //Add texture
        let imagePath = Path.BASE_PATH_TOWER+this.buttonID+".png";
        this.domElement.style.backgroundImage = `url(${imagePath})`;




        //Add listeners
        element.addEventListener("click",this.handleClick.bind(this));
        element.addEventListener("mousedown",startDrag.bind(this));
    }


     handleClick(){
        console.log("clicked "+this.buttonID);
    }





}

function startDrag(event) {
    draggedButton = this.domElement;
    const offsetX = event.clientX - draggedButton.getBoundingClientRect().left;
    const offsetY = event.clientY - draggedButton.getBoundingClientRect().top;

    draggedButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

function drag(event) {
    if (draggedButton) {
        const x = event.clientX - draggedButton.offsetWidth / 2;
        const y = event.clientY - draggedButton.offsetHeight / 2;

        draggedButton.style.left = `${x}px`;
        draggedButton.style.top = `${y}px`;
        console.log("draging")
    }
}

function stopDrag() {
    if (draggedButton) {
        draggedButton.style.transform = "translate(0, 0)";

       const mouseCoordinates = Gui.getCanvasMouseCoordinates();
       if (mouseCoordinates.x>=0 && mouseCoordinates.x<=Constants.width
        && mouseCoordinates.y>=0 && mouseCoordinates.y<=Constants.height){
           const gameObject = new Canon();
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
        console.log("End drag x:"+mouseCoordinates.x+" y:"+mouseCoordinates.y);


        draggedButton = null;
    }
}
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

