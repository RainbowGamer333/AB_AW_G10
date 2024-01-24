import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Lightning extends Projectile{
    constructor() {
        const name = "Lightning";
        const velocity = 40;
        const damage = 10;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.LIGHTNING;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }
}