import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path";
import {SpriteRenderer} from "../../../component/SpriteRenderer";
import {Global} from "../../../constants/Global";

export class Bank extends Tower{
    productionAmount;
    constructor() {
        const health = 2000;
        const damage = 50;
        const attackRate = 2;

        let image = new Image();
        image.src = Path.CANON;
        const spriteRenderer = new SpriteRenderer(image);
        super("canon", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.productionAmount = 1;
    }


    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            Global.coinBalance += this.productionAmount;
            this.accumulatedTime -= this.attackRate;
        }
        super.update(dt);
    }
}