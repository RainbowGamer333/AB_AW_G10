import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import TDAchievements from "../../../achievement/TDAchievements.js";
import AchievementConstant from "../../../achievement/AchievementConstant.js";

export class Skeleton extends Enemy{
    constructor(x,y) {
        const health = 1;
        const velocity = 50;
        const damage = 5;
        const attackRate = 4;

        let image = new Image();
        image.src = Path.SKELETON;
        const spriteRenderer = new SpriteRenderer(image);
        super("skeleton", x, y, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.score = 2;
        this.coinDropped = 1;
    }

    onDeath() {
        TDAchievements.increaseCounterAndTryUnlock(AchievementConstant.KILL_SKELETONS,1);
        super.onDeath();
    }
}