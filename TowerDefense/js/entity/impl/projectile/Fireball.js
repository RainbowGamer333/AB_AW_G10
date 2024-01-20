import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Fireball extends Projectile{

    constructor() {
        const name = "fireball";
        const velocity = 12;
        const damage = 100;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.FIREBALL;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }
}