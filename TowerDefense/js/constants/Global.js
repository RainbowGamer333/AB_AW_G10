export class Global{
    static lastGameObjectID = 0;
    static context;
    static gameObjects;
    static canvas;
    static coinBalance = 12;


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
            console.log("Can't delete object with id: " + object.id);
        }
    }
}