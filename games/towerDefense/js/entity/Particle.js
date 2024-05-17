import {GameObject} from "../GameObject.js";
import {Engine} from "../constants/Engine.js";

//the abstract representation of the particle
export class Particle extends GameObject{
    lifespan = 2;
    accumulatedTime = 0.0;
    constructor(name, x, y) {
        super(name, x, y);
        // let image = new Image();
        // image.src = Path.GHOST;
        // const spriteRenderer = new SpriteRenderer(image);
        // this.addComponent(spriteRenderer);
    }

    update(dt) {
        super.update(dt);
        this.accumulatedTime += dt;
        if (this.accumulatedTime >= this.lifespan) {
            Engine.removeGameObject(this);
        }
    }
}