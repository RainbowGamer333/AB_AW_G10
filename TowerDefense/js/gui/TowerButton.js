import {Path} from "../constants/Path.js";
// import {Constants} from "../constants/Constants";
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
        console.log("create : " + orignalId);


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
    }
}

function stopDrag() {
    if (draggedButton) {
        draggedButton.style.transform = "translate(0, 0)";
        draggedButton = null;
    }
}
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

