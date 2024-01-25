import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {GameObject} from "../../../GameObject.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";
import {Entity} from "../../Entity.js";
import {Enemy} from "../../Enemy.js";

export class SonarBeam extends Projectile{

    constructor() {
        const name = "Sonar_beam";
        const velocity = 180;
        const damage = 50;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.SONAR_BEAM;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        // super.update(dt);
        this.x -= this.velocity*dt;

        for (let i = 0; i < Global.gameObjects.length; i++) {
            let gameObject = Global.gameObjects[i];
            // console.log(this.y)
            if (gameObject.y === this.y && gameObject instanceof Enemy){ // if they are on the same line
                if (gameObject.x + Constants.TILE_SIZE_ZOOMED >= this.x // TOP LEFT
                    && gameObject.x <= this.x ){
                    gameObject.hurt(this.damage);
                    Global.removeGameObject(this);
                }
            }
        }
        if (this.x <= this.deadzone){ // Apply the deadzone
            Global.removeGameObject(this);
        }
    }
}