import {Tower} from "../entity/Tower.js";
import {gState} from "../main.js";

export class Engine {
    static lastGameObjectID = 0;
    static context;
    static gameObjects;
    static canvas;
    static coinBalance = 20000;//150
    static score = 0;
    static villageHealth = 0;
    static maxVillageHealth = 0;
    static villageHousesAlive = [];
    static gameState = null;


    static removeGameObject(object){
        let index = -1;

        for (let i=0; i<this.gameObjects.length; i++){
            if (this.gameObjects[i].id === object.id){
                index = i;
                break;
            }
        }


        if (index !== -1) {
            const halfBeforeTheUnwantedElement = this.gameObjects.slice(0, index);
            const halfAfterTheUnwantedElement = this.gameObjects.slice(index + 1);

            this.gameObjects = halfBeforeTheUnwantedElement.concat(halfAfterTheUnwantedElement);
        }else{
            // console.log("Can't delete object with id: " + object.id);
        }
    }

    static addGameObject(object){
        //todo check if object is already in the list
        this.gameObjects.push(object);
    }

    static addGameObjects(gameObjects){
        for (const gameObject of gameObjects){
            this.gameObjects.push(gameObject);
        }
    }

    static addScore(amount){
        this.score+=amount;
    }

    static isTileFree(x,y){
        // console.log("OKKKKKKKKKKKKKK")
        // console.log(" checking x:"+x+" y:"+y)
        for (let i=0; i<Engine.gameObjects.length; i++){
            let obj = Engine.gameObjects[i];
            if (obj instanceof Tower){
                // console.log("IS A TOWER" + obj.name + " x:"+obj.x + " y:"+obj.y)
                if (obj.x === x && obj.y === y){
                    return false;
                }
            }


        }
        return true;
    }

    static hurtVillage(amount){
        Engine.villageHealth -= amount;
        if (Engine.villageHealth <= 0) {
            Engine.villageHealth = 0;
            Engine.gameState = gState.END;
            console.log("THE END OF THE GAME")
        }
    }
}