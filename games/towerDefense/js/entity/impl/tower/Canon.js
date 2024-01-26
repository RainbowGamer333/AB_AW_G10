import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";
import {CanonBall} from "../projectile/CanonBall.js";

export class Canon extends Tower{
    constructor() {
        const health = 200;
        const damage = 50;
        const attackRate = 2;

        let image = new Image();
        image.src = Path.CANON;
        const spriteRenderer = new SpriteRenderer(image);
        super("canon", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
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
        let projectile = new CanonBall();
        projectile.y = y;
        projectile.x = this.x;
        Global.addGameObject(projectile);

    }
}