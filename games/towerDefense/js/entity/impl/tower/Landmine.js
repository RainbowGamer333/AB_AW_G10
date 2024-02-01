import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {CanonBall} from "../projectile/CanonBall.js";
import {Explosion} from "../particle/Explosion.js";

export class Landmine extends Tower{
    constructor() {
        const health = 10;
        const damage = 200;
        const attackRate = 2;

        let image = new Image();
        image.src = Path.LANDMINE;
        const spriteRenderer = new SpriteRenderer(image);
        super("Landmine", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
    }




    spawnProjectile() {


    }


    hurt(amount, source) {
        this.health = 0;
        source.hurt(this.damage,this);
        Engine.addGameObject(new Explosion(this.x,this.y));
        super.hurt(amount, source);

    }
}