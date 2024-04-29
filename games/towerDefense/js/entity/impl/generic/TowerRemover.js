import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {Enemy} from "../../Enemy.js";

export default class TowerRemover{


    constructor(mouseX, mouseY) {
        //Clipping the coordinates
        const clippedX = Math.trunc(mouseX / Constants.TILE_SIZE_ZOOMED) * Constants.TILE_SIZE_ZOOMED;
        const clippedY = Math.trunc(mouseY / Constants.TILE_SIZE_ZOOMED) * Constants.TILE_SIZE_ZOOMED;

        for (let i = 0; i < Engine.gameObjects.length; i++) {
            let gameObject = Engine.gameObjects[i];
            // console.log(this.y)
            if (gameObject.x === clippedX && Enemy.isTarget(gameObject)){ // if they are on the same line & Is a tower)
                if (gameObject.y === clippedY) {
                   gameObject.kill();
                }
            }
        }
    }
}