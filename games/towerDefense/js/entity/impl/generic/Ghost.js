import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Constants} from "../../../constants/Constants.js";
import {Utils} from "../../../utils/Utils.js";
import {GameObject} from "../../../GameObject.js";
import {Engine} from "../../../constants/Engine.js";
import {Particle} from "../../Particle.js";

export class Ghost extends Particle {
    lifespan = 2;
    accumulatedTime = 0.0;
    constructor( x, y) {
        super("Ghost", x, y);
        let image = new Image();
        image.src = Path.GHOST;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer);
    }

    update(dt) {
        super.update(dt);
        this.y -=3 * dt;
    }


}