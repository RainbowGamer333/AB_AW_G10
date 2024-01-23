import {GameObject} from "../GameObject.js";
import {Global} from "../constants/Global.js";
import {Entity} from "./Entity.js";
import {Constants} from "../constants/Constants.js";
import {Enemy} from "./Enemy.js";

export class Projectile extends GameObject{
    velocity;
    damage;
    effect;


    constructor(name, x, y, velocity, damage, effect) {
        super(name, x, y);
        this.velocity = velocity;
        this.damage = damage;
        this.effect = effect;
    }

    update(dt) {
        this.y -= this.velocity*dt;
        super.update(dt);

        for (let i = 0; i < Global.gameObjects.length; i++) {
            let gameObject = Global.gameObjects[i];
            // console.log(this.y)
            if (gameObject.x === this.x && gameObject instanceof Enemy){ // if they are on the same line
                if (gameObject.y + Constants.TILE_SIZE_ZOOMED >= this.y // TOP LEFT
                    && gameObject.y <= this.y ){
                    gameObject.hurt(this.damage);
                    Global.removeGameObject(gameObject);
                    Global.removeGameObject(this);
                }
            }
        }
        if (this.y <= -Constants.TILE_SIZE_ZOOMED ){//If the projectile is off the screen
            Global.removeGameObject(this);
        }
    }
}