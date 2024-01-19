import {GameObject} from "../GameObject.js";
import {EntityFactory} from "../EntityFactory.js";
import {Global} from "../constants/Global.js";
import {Constants} from "../constants/Constants.js";
import {Utils} from "../utils/Utils.js";
import {Goblin} from "./impl/Goblin.js";
import {Goliath} from "./impl/Goliath.js";
import {Necromancer} from "./impl/Necromancer.js";
import {Demon} from "./impl/Demon.js";
import {Ogre} from "./impl/Ogre.js";

const spawnInterval = 1;
let accumulatedTime = 0.0; // Temps accumulé depuis le dernier spawn
let counter = 0;
export class MonsterSpawner extends GameObject{
    update(dt) {
        accumulatedTime += dt;


        if (accumulatedTime >= spawnInterval) {

            //Spawning enemy
            console.log("Spawning monsters");
            let entity = null;
            const enemyType = Utils.randomIntFromInterval(0,4);
            // L'interval peut augmenter, au début il est limité au petit ogre et gobelin et progressivement il arrive aux demons
            switch (enemyType) {
                case 0 : {
                    // entity = EntityFactory.create_monster();
                    entity = new Goblin();
                    break;
                }
                case 1 : {
                    entity = new Ogre();
                    break;
                }
                case 2 : {
                    entity = new Demon();
                    break;
                }
                case 3 : {
                    entity = new Necromancer();
                    break;
                }
                case 4 : {
                    entity = new Goliath();
                    break;
                }
                default : {
                    entity = new Goblin();
                }
            }

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