import {Engine} from "../constants/Engine.js";
import {Entity} from "./Entity.js";
import {Constants} from "../constants/Constants.js";
import {Enemy} from "./Enemy.js";

//The abstract representation of projectile
export class Projectile extends Entity{
    velocity;
    damage;
    effect;
    deadzone;
    source;


    constructor(name, x, y, velocity, damage, effect,source) {
        super(name, x, y);
        this.velocity = velocity;
        this.damage = damage;
        this.effect = effect;
        this.deadzone = -32;
        this.source = source;
    }

    //Handle the progress of the projectile through the game & handles collisions with ennemies
    update(dt) {
        super.update(dt);
        this.y -= this.velocity*dt;

        for (let i = 0; i < Engine.gameObjects.length; i++) {
            let gameObject = Engine.gameObjects[i];
            // console.log(this.y)
            if (gameObject.x === this.x && gameObject instanceof Enemy){ // if they are on the same col
                if (gameObject.y + Constants.TILE_SIZE_ZOOMED >= this.y // TOP LEFT
                    && gameObject.y <= this.y ){
                    this.onTargetTouched(gameObject);
                }
            }
        }
        if (this.y <= this.deadzone){ // Apply the deadzone
            this.onDeath();
            // Engine.removeGameObject(this);
        }
    }

    setDeadZone(deadZone){
        this.deadzone = this.y - (deadZone*Constants.TILE_SIZE_ZOOMED) ;
    }

    //Event when a target is touched by the projectile
    onTargetTouched(target){
        target.hurt(this.damage,this);
        Engine.removeGameObject(this);
    }
}