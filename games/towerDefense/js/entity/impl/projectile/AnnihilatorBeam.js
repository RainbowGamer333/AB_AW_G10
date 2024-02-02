import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {GameObject} from "../../../GameObject.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";
import {Entity} from "../../Entity.js";

export class AnnihilatorBeam extends Projectile{

    constructor() {
        const name = "AnnihilatorBeam";
        const velocity = 200;
        const damage = 150;
        super(name, 0, 0, velocity, damage, null,null);

        let image = new Image();
        image.src = Path.ANNIHILATOR_BEAM;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        super.update(dt);
    }
}