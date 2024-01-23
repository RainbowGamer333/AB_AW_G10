import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {GameObject} from "../../../GameObject.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";
import {Entity} from "../../Entity.js";

export class Fireball extends Projectile{

    constructor() {
        const name = "fireball";
        const velocity = 12;
        const damage = 100;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.FIREBALL;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        super.update(dt);
        for (let i = 0; i < Global.gameObjects.length; i++) {
            let gameObject = Global.gameObjects[i];
            // console.log(this.y)
            if (gameObject.x === this.x && gameObject instanceof Entity){ // if they are on the same line
                if (gameObject.y + Constants.TILE_SIZE_ZOOMED >= this.y // TOP LEFT
                    && gameObject.y <= this.y ){
                    console.log("ZIZI");
                    Global.removeGameObject(gameObject);
                    Global.removeGameObject(this);
                }
            }
        }
        if (this.y <= -Constants.TILE_SIZE_ZOOMED ){
            Global.removeGameObject(this);
        }


    }
}