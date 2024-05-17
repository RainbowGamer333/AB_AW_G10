import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Particle} from "../../Particle.js";

//Ghost particle, displayed on enemies death
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