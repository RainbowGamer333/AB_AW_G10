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
import EnemyWave from "../generic/EnemyWave.js";
import {Skeleton} from "../enemy/Skeleton.js";
import EnemyWaveInfinite from "./EnemyWaveInfinite.js";

const spawnInterval = 2;
let accumulatedTime = 0.0; // Temps accumulé depuis le dernier spawn
let counter = 0;
export class WavyMonsterSpawner extends GameObject{
    currentWaveIndex = 0;
    waves = [];

    init(){
        // -------------------------------------------- V 1
        // SpawnRate : lent
        // Ogre x20
        // Gobelin x2
        this.waves.push(new EnemyWave(7,
            {
                ogre : {
                    amount : 15,
                    spawnFunc : () => new Ogre()
                }
            }));

        // -------------------------------------------- V 2
        // SpawnRate : moyen
        // Ogre x 5
        // Goblin x 5
        // skeleton x 3
        this.waves.push(new EnemyWave(3,
            {
                goblin : {
                    amount : 15,
                    spawnFunc : () => new Goblin()
                },
                skeleton : {
                    amount : 10,
                    spawnFunc : () => new Skeleton()
                },
                ogre : {
                    amount : 5,
                    spawnFunc : () => new Ogre()
                }
            }));

        // -------------------------------------------- V 3
        this.waves.push(new EnemyWave(3,
            {
                goblin : {
                    amount : 10,
                    spawnFunc : () => new Goblin()
                },
                ogre : {
                    amount : 10,
                    spawnFunc : () => new Ogre()
                },
                necromancer : {
                    amount : 10,
                    spawnFunc : () => new Necromancer()
                }
            }));

        // -------------------------------------------- V 4
        this.waves.push(new EnemyWave(0.2,
            {
                skeleton : {
                    amount : 100,
                    spawnFunc : () => new Skeleton()
                }
            }));
        // -------------------------------------------- V 5
        this.waves.push(new EnemyWave(5,
            {
                skeleton : {
                    amount : 20,
                    spawnFunc : () => new Skeleton()
                },
                Goliath : {
                    amount : 3,
                    spawnFunc : () => new Goliath()
                },
                goblin : {
                    amount : 10,
                    spawnFunc : () => new Goblin()
                }
            }));
        // -------------------------------------------- V 6
        // -------------------------------------------- V 7
        // -------------------------------------------- V 8
        // -------------------------------------------- V 9

        //----------------------------------------------------End wave (infinite)
        let ewInfinite = new EnemyWaveInfinite(3);
        this.waves.push(ewInfinite);
    }
    update(dt) {
        accumulatedTime += dt;

        let wave = this.waves[this.currentWaveIndex];
        if (wave.isFinished()){
            console.log(" ---- NEW WAVE -> "+ this.currentWaveIndex);
            this.currentWaveIndex++;
            wave = this.waves[this.currentWaveIndex];
        }


        if (accumulatedTime >= wave.spawnInterval) {

            //Spawning enemy
            // console.log("Spawning monsters");
            let entity = null;



            entity = wave.spawnNextEnemy();
            if (entity){
                // console.log(entity)



                let col = Utils.randomIndexFromTrueBooleans(Engine.villageHousesAlive);

                col *= Constants.TILE_SIZE_ZOOMED;
                entity.x = col;
                entity.y = -32;
                entity.name += "_"+ counter++;
                entity.addDeathListener(this);

                Engine.gameObjects.push(entity);


            }
            accumulatedTime = 0;
        }

    }

    notifyDeath(entity){
        // console.log("A mob is dead")
        this.waves[this.currentWaveIndex].notifyDeath();
    }
}