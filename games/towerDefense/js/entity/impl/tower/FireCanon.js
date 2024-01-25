import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";
import {Canon} from "./Canon.js";

export class FireCanon extends Tower{
    constructor() {
        const health = 300;
        const damage = 100;
        const attackRate = 3;

        let image = new Image();
        image.src = Path.FIRE_CANON;
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
        // const spawnOffset = 10;
        // const y  = this.y - spawnOffset;
        // let projectile = new Fireball();
        // projectile.y = y;
        // projectile.x = this.x;
        // Global.addGameObject(projectile);

        const spawnOffset = 10;
        const y  = this.y - spawnOffset;
        let projectile = new Fireball();
        projectile.y = y;
        projectile.x = this.x;
        projectile.damage = this.damage;
        Global.addGameObject(projectile);

    }
}