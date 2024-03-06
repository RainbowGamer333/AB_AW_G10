import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {Canon} from "./Canon.js";
import {Frostshard} from "../projectile/Frostshard.js";

export class IceCanon extends Tower{

    constructor() {
        const health = 300;
        const damage = 5;
        const attackRate = 1.5;

        let image = new Image();
        image.src = Path.ICE_CANON;
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
        const defaultOffsetY = 10;
        this.spawnFireShard(-Constants.TILE_SIZE_ZOOMED,defaultOffsetY-20); // LEFT
        setTimeout(() => this.spawnFireShard(0,defaultOffsetY),100);  // MIDDLE
        this.spawnFireShard(Constants.TILE_SIZE_ZOOMED,defaultOffsetY-20); // RIGHT
    }

    spawnFireShard(offsetX,offsetY){
        const y  = this.y - offsetY;
        let projectile = new Frostshard();
        projectile.y = y;
        projectile.x = this.x + offsetX;
        projectile.damage = this.damage;
        projectile.source = this;
        Engine.addGameObject(projectile);
    }
}