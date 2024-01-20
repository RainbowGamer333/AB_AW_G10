import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";

export class Canon extends Tower{
    constructor() {
        const health = 2000;
        const damage = 50;
        const attackRate = 4;

        let image = new Image();
        image.src = Path.CANON;
        const spriteRenderer = new SpriteRenderer(image);
        super("canon", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            this.spawnProjectile();
            this.accumulatedTime -= this.attackRate;
        }
        super.update(dt);
    }


    spawnProjectile() {
        const spawnOffset = 16;
        const y  = this.y - spawnOffset;
        let projectile = new Fireball();
        projectile.y = y;
        projectile.x = this.x;
        Global.addGameObject(projectile);
    }
}