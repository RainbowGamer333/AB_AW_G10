import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import AchievementUtils from "../../../../../../js/AchievementUtils.js";
import TDAchievementConstant from "../../../achievement/TDAchievementConstant.js";

export class Goliath extends Enemy{
    constructor() {
        const health = 3000;
        const velocity = 3;
        const damage = 40;
        const attackRate = 6;

        let image = new Image();
        image.src = Path.GOLIATH;
        const spriteRenderer = new SpriteRenderer(image);
        super("goliath", 0, 0, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.score = 250;
        this.coinDropped = 100;
    }


    onDeath() {
        AchievementUtils.increaseCounterAndTryUnlock(TDAchievementConstant.KILL_GOLEM,1);
        super.onDeath();
    }
}