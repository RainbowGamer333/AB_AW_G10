import {GameObject} from "../../../GameObject.js";
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

//A monster spawner which uses the principle of waves
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
        this.waves.push(new EnemyWave(2.5,
            {
                goblin : {
                    amount : 20,
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
        this.waves.push(new EnemyWave(0.3,
            {
                skeleton : {
                    amount : 100,
                    spawnFunc : () => new Skeleton()
                },
                ogre : {
                    amount : 10,
                    spawnFunc : () => new Ogre()
                }
            }));
        // -------------------------------------------- V 5
        this.waves.push(new EnemyWave(2.2,
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
        this.waves.push(new EnemyWave(3.5,
            {
                necromancer : {
                    amount : 10,
                    spawnFunc : () => new Necromancer()
                },
                Goliath : {
                    amount : 3,
                    spawnFunc : () => new Goliath()
                },
                goblin : {
                    amount : 5,
                    spawnFunc : () => new Goblin()
                },
                demon : {
                    amount : 2,
                    spawnFunc : () => new Demon()
                }
            }));
        // -------------------------------------------- V 7
        this.waves.push(new EnemyWave(3,
            {
                necromancer : {
                    amount : 3,
                    spawnFunc : () => new Necromancer()
                },
                Goliath : {
                    amount : 1,
                    spawnFunc : () => new Goliath()
                },
                goblin : {
                    amount : 5,
                    spawnFunc : () => new Goblin()
                },
                ogre : {
                    amount : 30,
                    spawnFunc : () => new Ogre()
                }
            }));
        // -------------------------------------------- V 8
        this.waves.push(new EnemyWave(3.5,
            {
                Goliath : {
                    amount : 3,
                    spawnFunc : () => new Goliath()
                },
                demon : {
                    amount : 3,
                    spawnFunc : () => new Demon()
                },
                necromancer : {
                    amount : 5,
                    spawnFunc : () => new Necromancer()
                }
            }));
        // -------------------------------------------- V 9
        this.waves.push(new EnemyWave(2,
            {
                Goliath : {
                    amount : 3,
                    spawnFunc : () => new Goliath()
                },
                demon : {
                    amount : 2,
                    spawnFunc : () => new Demon()
                },
                necromancer : {
                    amount : 15,
                    spawnFunc : () => new Necromancer()
                },
                ogre : {
                    amount : 15,
                    spawnFunc : () => new Ogre()
                },
                goblin : {
                    amount : 10,
                    spawnFunc : () => new Goblin()
                },
                skeleton : {
                    amount : 30,
                    spawnFunc : () => new Skeleton()
                }
            }));

        //----------------------------------------------------End wave (infinite)
        let ewInfinite = new EnemyWaveInfinite(3);
        this.waves.push(ewInfinite);

        //Display first wave
        Engine.setProgress(1);
    }
    update(dt) {
        accumulatedTime += dt;

        let wave = this.waves[this.currentWaveIndex];
        if (wave.isFinished()){
            this.currentWaveIndex++;
            console.log(" ---- NEW WAVE -> "+ this.currentWaveIndex);
            Engine.setProgress(this.currentWaveIndex+1);
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