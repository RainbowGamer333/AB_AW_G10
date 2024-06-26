import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";


export class CanonBall extends Projectile{

    constructor() {
        const name = "fireball";
        const velocity = 80;
        const damage = 100;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.CANON_BALL;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        super.update(dt);
    }
}