import {GameObject} from "../../../GameObject.js";
import {EntityFactory} from "../../../EntityFactory.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {Utils} from "../../../utils/Utils.js";
import {Goblin} from "../enemy/Goblin.js";
import {Goliath} from "../enemy/Goliath.js";
import {Necromancer} from "../enemy/Necromancer.js";
import {Demon} from "../enemy/Demon.js";
import {Ogre} from "../enemy/Ogre.js";

const spawnInterval = 2;
let accumulatedTime = 0.0; // Temps accumulé depuis le dernier spawn
let counter = 0;
export class WavyMonsterSpawner extends GameObject{
    waveID = 0;
    update(dt) {
        accumulatedTime += dt;


        if (accumulatedTime >= spawnInterval) {

            //Spawning enemy
            // console.log("Spawning monsters");
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

            let col = Utils.randomIndexFromTrueBooleans(Engine.villageHousesAlive);

            col *= Constants.TILE_SIZE_ZOOMED;
            entity.x = col;
            entity.y = -32;
            entity.name += "_"+ counter++;
            entity.addDeathListener(this);

            Engine.gameObjects.push(entity);

            accumulatedTime = 0;
        }

    }

    notifyDeath(entity){
        console.log("A mob is dead")
    }
}