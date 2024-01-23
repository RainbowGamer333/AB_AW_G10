import {Entity} from "./Entity.js";
import {Constants} from "../constants/Constants.js";
import {Global} from "../constants/Global.js";
import {Tower} from "./Tower.js";

export class Enemy extends Entity{
    score;
    coinDropped;
    accumulatedTime = 0.0;

    constructor(name, x, y, velocity, health, maxHealth, damage) {
        super(name, x, y, velocity, health, maxHealth, damage);
        this.score = 0;
        this.coinDropped = 0;
    }

    update(dt) {
        super.update(dt);


        let isColliding = false;
        for (let i = 0; i < Global.gameObjects.length; i++) {
            let gameObject = Global.gameObjects[i];
            // console.log(this.y)
            if (gameObject.x === this.x && gameObject instanceof Tower){ // if they are on the same line
                if (gameObject.y >= this.y // TOP LEFT
                    && gameObject.y <= this.y + Constants.TILE_SIZE_ZOOMED ){
                    this.accumulatedTime+=dt;
                    if(this.accumulatedTime>=this.attackRate){
                        gameObject.hurt(this.damage);
                        this.accumulatedTime -= this.attackRate;
                        break;
                    }

                    isColliding= true;
                }
            }
        }
        if(!isColliding){
            this.y += this.velocity * dt;
        }

        // if (this.y <= -Constants.TILE_SIZE_ZOOMED ){
        //     Global.removeGameObject(this);
        // }
    }


    onDeath() {
        Global.score+=this.score;
        Global.coinBalance+=this.coinDropped;
        super.onDeath();
    }
}