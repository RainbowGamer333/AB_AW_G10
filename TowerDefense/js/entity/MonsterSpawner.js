import {GameObject} from "../GameObject.js";
import {EntityFactory} from "../EntityFactory.js";
import {Global} from "../constants/Global.js";
import {Constants} from "../constants/Constants.js";
import {Utils} from "../utils/Utils.js";

const spawnInterval = 1;
let accumulatedTime = 0.0; // Temps accumulé depuis le dernier spawn
let counter = 0;
export class MonsterSpawner extends GameObject{
    update(dt) {
        accumulatedTime += dt;


        if (accumulatedTime >= spawnInterval) {

            //Spawning enemy
            console.log("Spawning monsters");
            const entity = EntityFactory.create_monster();

            let col = Utils.randomIntFromInterval(0,Constants.colums-1);
            col *= Constants.TILE_SIZE_ZOOMED;
            entity.x = col;
            entity.y = -32;
            entity.name += "_"+ counter++;

            Global.gameObjects.push(entity);
            // Réinitialiser le temps accumulé
            accumulatedTime = 0;
        }

    }
}