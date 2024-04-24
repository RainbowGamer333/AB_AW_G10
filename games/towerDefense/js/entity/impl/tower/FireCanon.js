import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
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





    spawnProjectile() {
        // const spawnOffset = 10;
        // const y  = this.y - spawnOffset;
        // let projectile = new Fireball();
        // projectile.y = y;
        // projectile.x = this.x;
        // Engine.addGameObject(projectile);

        const spawnOffset = 10;
        const y  = this.y - spawnOffset;
        let projectile = new Fireball();
        projectile.y = y;
        projectile.x = this.x;
        projectile.damage = this.damage;
        projectile.source = this;
        projectile.setDeadZone(9);
        Engine.addGameObject(projectile);

    }
}