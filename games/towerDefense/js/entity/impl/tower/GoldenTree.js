import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {Utils} from "../../../utils/Utils.js";
import {Goblin} from "../enemy/Goblin.js";
import TDAchievements from "../../../achievement/TDAchievements.js";
import AchievementConstant from "../../../achievement/AchievementConstant.js";

export class GoldenTree extends Tower{
    productionAmount;
    constructor() {
        const health = 100;
        const damage = 0;
        const attackRate = 2;

        let image = new Image();
        image.src = Path.GOLDEN_TREE;
        const spriteRenderer = new SpriteRenderer(image);
        super("GoldenTree", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.productionAmount = 10;
        this.attackRate = 3;
        TDAchievements.increaseCounterAndTryUnlock(AchievementConstant.PLACE_TREES,1);
    }


    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            Engine.coinBalance += this.productionAmount;
            const choice = Utils.randomIntFromInterval(0,3);
            if (choice === 0) this.spawnGobelin();
            this.accumulatedTime = 0;
        }
        super.updateComponents(dt);
    }

    spawnGobelin(){
        const col = Utils.randomIntFromInterval(0,Constants.colums);
        const randomPlacedEntity = new Goblin();
        randomPlacedEntity.x = col * Constants.TILE_SIZE_ZOOMED;
        randomPlacedEntity.y = -32;
        const entity = new Goblin();
        entity.x = this.x;
        entity.y = -32;

        Engine.addGameObject(randomPlacedEntity);
        Engine.addGameObject(entity);
    }
}