export class TowerButton{
    id;
    domElement;
    constructor(element){
        this.domElement = element;
        let ok = element.id;
        console.log(ok);
        // this.id = id;

        element.addEventListener("click",this.handleClick);
    }


     handleClick(){
        console.log(this.id)
    }
}