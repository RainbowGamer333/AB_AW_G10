import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Constants} from "../../../constants/Constants.js";
import {Utils} from "../../../utils/Utils.js";
import {GameObject} from "../../../GameObject.js";
import {Engine} from "../../../constants/Engine.js";
import {Particle} from "../../Particle.js";

export class Hitmarker extends Particle {
    lifespan = 0.1;
    accumulatedTime = 0.0;
    constructor( x, y) {
        const offset = 5 ;
        super("Hitmaker", x, y);
        this.x +=   Utils.randomIntFromInterval(-offset,offset);
        this.y  += Utils.randomIntFromInterval(-offset,offset);
        let image = new Image();
        image.src = Path.HITMARKER_DAMAGE;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer);
    }

    update(dt) {
        super.update(dt);
        this.y -=3 * dt;
    }


}