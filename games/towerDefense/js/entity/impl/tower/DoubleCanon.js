import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {CanonBall} from "../projectile/CanonBall.js";

export class DoubleCanon extends Tower{
    constructor() {
        const health = 100;
        const damage = 30;
        const attackRate = 1.0;

        let image = new Image();
        image.src = Path.DOUBLE_CANON;
        const spriteRenderer = new SpriteRenderer(image);
        super("double_canon", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            this.spawnProjectile();
            // setTimeout(this.spawnProjectile(),500);
            this.accumulatedTime = 0;
        }
        super.updateComponents(dt);
    }

    spawnProjectile() {
        // const spawnOffset = 10;
        // const y  = this.y - spawnOffset;
        // let projectile = new Fireball();
        // projectile.y = y;
        // projectile.x = this.x;
        // Engine.addGameObject(projectile);

        const spawnOffset = 10;
        const y  = this.y - spawnOffset;
        let projectile = new CanonBall();
        projectile.y = y;
        projectile.x = this.x;
        projectile.source = this;
        Engine.addGameObject(projectile);

    }
}