import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Utils} from "../../../utils/Utils.js";
import {Particle} from "../../Particle.js";

//Particle explosion, displayed at the death on the landmine
export class Explosion extends Particle {
    lifespan = 0.5;
    accumulatedTime = 0.0;
    constructor( x, y) {
        const offset = 5 ;
        super("Explosion", x, y);
        this.x +=   Utils.randomIntFromInterval(-offset,offset);
        this.y  += Utils.randomIntFromInterval(-offset,offset);
        let image = new Image();
        image.src = Path.EXPLOSION;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer);
    }

    update(dt) {
        super.update(dt);
        this.y -=3 * dt;
    }


}