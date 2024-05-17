import {Engine} from "./constants/Engine.js";
import {Constants} from "./constants/Constants.js";

//The very first abstract class, representing an element in the game : Tower, Building, projectile, tiles, particles ...
// It can be described as the "atom" of the game
export class GameObject {
    name;
    id;
    //List of components attached to the game object
    components = [];
    //position X of the game object
    x;
    //position Y of the game object
    y;

    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = Engine.lastGameObjectID++;
    }

    //Update the gameObject itself and calls updateComponents()
    update(dt){
        this.updateComponents(dt);
    }

    //Update each component's model of the game object
    updateComponents(dt){
        for(let i=0; i<this.components.length; i++){
            this.components[i].update(dt);
        }
    }

    //Render each component of the game object
    render(){
        for(let i=0; i<this.components.length; i++){
            this.components[i].render();
        }
    }

    //Add a component to the gameObject
    addComponent(component){
        this.components.push(component);
        component.parent = this;
    }


    //remove the component from a gameObject
    removeComponent(component){
        this.components.remove(component);//TODO
        component.parent = null;
    }

    //return the column of the postion of the current object
    getColumn(){
        return Math.trunc(this.x / Constants.TILE_SIZE_ZOOMED);
    }

    //return the line of the positon of the current object
    getLine(){
        return Math.trunc(this.y / Constants.TILE_SIZE_ZOOMED);
    }

    //@Deprecated, Don't work
    //Return a component
    getComponent(componentClass){ //todo Dont work
        // console.log("okkkk")
        for (let i = 0; i < this.components; i++){
            console.log(this.components[i].className)
            if (this.components[i].className === componentClass.className) {

                return this.components[i];
            }
        }
        return null;
    }
}