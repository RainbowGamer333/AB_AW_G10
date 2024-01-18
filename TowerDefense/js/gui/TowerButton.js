import {Path} from "../constants/Path.js";

export class TowerButton{
    id;
    domElement;
    constructor(element){
        this.domElement = element;
        let orignalId = element.id;
        this.id = orignalId.substring(3);


        //Add texture
        this.domElement.style.backgroundImage = `url(${Path.GRASS})`;


        //Add listeners
        element.addEventListener("click",this.handleClick);
    }


     handleClick(){
        console.log(this.id)
    }
}