import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {GameObject} from "../../../GameObject.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {Entity} from "../../Entity.js";

export class Frostshard extends Projectile{
    lastEnemyTouched;
    constructor() {
        const name = "frostshard";
        const velocity = 300;
        const damage = 5;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.FROSTSHARD;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        super.update(dt);
    }


    onTargetTouched(target) {
        // target.addEffect("frost",1000);
        target.velocityMultiplier = 0.5;
        super.onTargetTouched(target);

    }
}