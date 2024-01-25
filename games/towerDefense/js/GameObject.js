import {Global} from "./constants/Global.js";
import {Constants} from "./constants/Constants.js";

export class GameObject {
    name;
    id;
    components = [];
    x;
    y;

    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = Global.lastGameObjectID++;
    }
    update(dt){
        for(let i=0; i<this.components.length; i++){
            this.components[i].update(dt);
        }
    }

    render(){
        for(let i=0; i<this.components.length; i++){
            this.components[i].render();
        }
    }

    addComponent(component){
        this.components.push(component);
        component.parent = this;
    }

    removeComponent(component){
        this.components.remove(component);//TODO
        component.parent = null;
    }

    getColumn(){
        return Math.trunc(this.x / Constants.TILE_SIZE_ZOOMED);
    }

    getLine(){
        return Math.trunc(this.y / Constants.TILE_SIZE_ZOOMED);
    }
}