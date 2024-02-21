import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {Lightning} from "../projectile/Lightning.js";
import {Constants} from "../../../constants/Constants.js";

export class LightningTower extends Tower {
    constructor() {
        const health = 150;
        const damage = 2;
        const attackRate = 0.15;
        const range = 3

        let image = new Image();
        image.src = Path.LIGHTNING_TOWER;
        const spriteRenderer = new SpriteRenderer(image);
        super("Lightning_tower", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)

    }



    spawnProjectile() {
        // const spawnOffset = 10;
        // const y  = this.y - spawnOffset;
        // let projectile = new Fireball();
        // projectile.y = y;
        // projectile.x = this.x;
        // Engine.addGameObject(projectile);

        const spawnOffset = 18;
        const y  = this.y - spawnOffset;
        let projectile = new Lightning();
        projectile.y = y;
        projectile.x = this.x;
        projectile.damage = this.damage;
        projectile.setDeadZone(6);
        Engine.addGameObject(projectile);

    }
}