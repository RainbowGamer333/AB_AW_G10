import {Tower} from "../entity/Tower.js";

export class Global{ //TODO RENAME TO GameEngine
    static lastGameObjectID = 0;
    static context;
    static gameObjects;
    static canvas;
    static coinBalance = 20000;//150
    static score = 0;
    static villageHealth = 0;
    static maxVillageHealth = 0;


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
        console.log(" checking x:"+x+" y:"+y)
        for (let i=0;i<Global.gameObjects.length;i++){
            let obj = Global.gameObjects[i];
            if (obj instanceof Tower){
                console.log("IS A TOWER" + obj.name + " x:"+obj.x + " y:"+obj.y)
                if (obj.x === x && obj.y === y){
                    return false;
                }
            }


        }
        return true;
    }
}