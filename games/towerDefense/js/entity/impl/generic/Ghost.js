import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Constants} from "../../../constants/Constants.js";
import {Utils} from "../../../utils/Utils.js";
import {GameObject} from "../../../GameObject.js";
import {Engine} from "../../../constants/Engine.js";

export class Ghost extends GameObject {
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
        this.accumulatedTime += dt;
        this.y -= 4 * dt;
        if (this.accumulatedTime >= this.lifespan) {
            Engine.removeGameObject(this);
        }
    }


}