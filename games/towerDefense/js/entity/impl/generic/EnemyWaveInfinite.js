import EnemyWave from "./EnemyWave.js";
import {Utils} from "../../../utils/Utils.js";
import {Goblin} from "../enemy/Goblin.js";
import {Ogre} from "../enemy/Ogre.js";
import {Demon} from "../enemy/Demon.js";
import {Necromancer} from "../enemy/Necromancer.js";
import {Goliath} from "../enemy/Goliath.js";


export default class EnemyWaveInfinite extends EnemyWave{
    constructor(spawnInterval) {
        super(spawnInterval, {});
        // console.log("creating enemy wave")
        this.spawnInterval = spawnInterval;
        // 1. Intanciation de tout les mobs
        // this.enemyList = this.createEnemies(waveParameters);
        // 2. Shuffle des mobs


        // Spawn selon un index
    }

    spawnNextEnemy(){
        let entity = null;
        const enemyType = Utils.randomIntFromInterval(0,4);

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
        this.currentSpawnIndex++;
        return entity;

    }



    isFinished (){
        return false;
    }

    shuffle(array) {
        // Algorithme de mélange de Fisher-Yates
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


}