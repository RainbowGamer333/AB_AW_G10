import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Constants} from "../../../constants/Constants.js";
import {Utils} from "../../../utils/Utils.js";
import TDAchievementConstant from "../../../achievement/TDAchievementConstant.js";
import AchievementUtils from "../../../../../../js/AchievementUtils.js";

export class Demon extends Enemy {
    teleportInterval = 10;
    accumulatedTime = 0.0;
    constructor() {
        const health = 2000;
        const velocity = 3;
        const damage = 50;
        const attackRate = 4;

        let image = new Image();
        image.src = Path.DEMON;
        const spriteRenderer = new SpriteRenderer(image);
        super("demon", 0, 0, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.score = 100;
        this.coinDropped = 250;
    }

    update(dt) {
        super.update(dt);
        this.accumulatedTime += dt;


        if (this.accumulatedTime >= this.teleportInterval) {
            this.teleport();
            this.accumulatedTime = 0.0;
        }
    }

    teleport(){
        //TODO Téléport to adjacent tile instead of any
        const columnChoice = Utils.randomIntFromInterval(1,Constants.colums);
        this.x = columnChoice * Constants.TILE_SIZE_ZOOMED;

    }

    onDeath() {
        AchievementUtils.increaseCounterAndTryUnlock(TDAchievementConstant.KILL_DEMONS,1);
        super.onDeath();
    }
}