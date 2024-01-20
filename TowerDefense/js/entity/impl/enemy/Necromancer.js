import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Skeleton} from "./Skeleton.js";
import {Global} from "../../../constants/Global.js";

export class Necromancer extends Enemy {
     spawnInterval = 1;
     accumulatedTime = 0.0;
    constructor() {
        const health = 2000;
        const velocity = 3;
        const damage = 50;
        const attackRate = 10;


        let image = new Image();
        image.src = Path.NECROMANCER;
        const spriteRenderer = new SpriteRenderer(image);
        super("demon", 0, 0, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.spawnInterval = 5;
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

        const skeleton = new Skeleton(this.x, this.y);
        Global.addGameObject(skeleton);
    }
}