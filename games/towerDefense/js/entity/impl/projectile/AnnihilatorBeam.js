import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {GameObject} from "../../../GameObject.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";
import {Entity} from "../../Entity.js";

export class AnnihilatorBeam extends Projectile{

    constructor() {
        const name = "AnnihilatorBeam";
        const velocity = 200;
        const damage = 100;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.ANNIHILATOR_BEAM;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        super.update(dt);
    }
}