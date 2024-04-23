import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Skeleton} from "./Skeleton.js";
import {Engine} from "../../../constants/Engine.js";
import {Utils} from "../../../utils/Utils.js";
import {Constants} from "../../../constants/Constants.js";

export class Necromancer extends Enemy {
     spawnInterval = 1;
     accumulatedTime = 0.0;
    constructor() {
        const health = 400;
        const velocity = 6;
        const damage = 50;
        const attackRate = 10;


        let image = new Image();
        image.src = Path.NECROMANCER;
        const spriteRenderer = new SpriteRenderer(image);
        super("Necromancer", 0, 0, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.spawnInterval = 5;
        this.coinDropped = 5;
        this.score = 5;
    }


    update(dt) {
        super.update(dt);
        this.accumulatedTime += dt;


        if (this.accumulatedTime >= this.spawnInterval) {
            this.spawnSkeleton();
            this.accumulatedTime = 0.0;
        }
    }

    spawnSkeleton(){
        const choice = Utils.randomIntFromInterval(0,7);
        // const choice = 3;
        switch (choice) {
            case 0: { // Spawn at the same position
                const skeleton = new Skeleton(this.x, this.y);
                Engine.addGameObject(skeleton);
                break;
            }
            case 1: { //Spawn left
                if (this.getColumn() != 1){ // Check if not extreme left
                    const skeleton = new Skeleton(this.x-Constants.TILE_SIZE_ZOOMED, this.y);
                    Engine.addGameObject(skeleton);
                    break;
                }
            }
            case 2: { //Spawn right
                if (this.getColumn() != Constants.colums){ // Check if not extreme right
                    const skeleton = new Skeleton(this.x+Constants.TILE_SIZE_ZOOMED, this.y);
                    Engine.addGameObject(skeleton);
                    break;
                }
            }
            case 3: { //Spawn same position, left, right
                const column = this.getColumn();
                if (column != 1 && column != Constants.colums ){
                    const skeletons = [];
                    skeletons.push( new Skeleton(this.x, this.y));
                    skeletons.push( new Skeleton(this.x-Constants.TILE_SIZE_ZOOMED, this.y));
                    skeletons.push( new Skeleton(this.x+Constants.TILE_SIZE_ZOOMED, this.y));
                    Engine.addGameObjects(skeletons);
                    break;
                }
            }
            default: break;

        }


    }
}