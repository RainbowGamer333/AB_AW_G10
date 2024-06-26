import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {CanonBall} from "../projectile/CanonBall.js";

export class MiniCanon extends Tower{
    constructor() {
        const health = 40;
        const damage = 18;
        const attackRate = 2.5;

        let image = new Image();
        image.src = Path.MINI_CANON;
        const spriteRenderer = new SpriteRenderer(image);
        super("mini_canon", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
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
        projectile.damage = this.damage;
        projectile.setDeadZone(7);
        projectile.velocity = 100;
        Engine.addGameObject(projectile);

    }
}