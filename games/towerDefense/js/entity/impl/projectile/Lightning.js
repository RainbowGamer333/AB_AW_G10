import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Constants} from "../../../constants/Constants.js";
import {Engine} from "../../../constants/Engine.js";

export class Lightning extends Projectile{

    constructor() {
        const name = "Lightning";
        const velocity = 200;
        const damage = 10;
        const range = 3;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.LIGHTNING;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)

    }
}