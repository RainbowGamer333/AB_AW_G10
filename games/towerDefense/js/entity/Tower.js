import {Entity} from "./Entity.js";
import {Hitmarker} from "./impl/particle/Hitmarker.js";
import {Engine} from "../constants/Engine.js";

export class Tower extends Entity {
    accumulatedTime = 0.0;

    constructor(name, x, y, velocity, health, maxHealth, damage, attackRate) {
        super(name, x, y, velocity, health, maxHealth, damage, attackRate);
    }

    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            this.spawnProjectile();
            this.accumulatedTime = 0;
        }
        super.updateComponents(dt);
    }


    hurt(amount, source) {
        Engine.addGameObject(new Hitmarker(this.x,this.y));
        super.hurt(amount, source);
    }

    spawnProjectile(){

    }
}