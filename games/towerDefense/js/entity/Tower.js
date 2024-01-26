import {Entity} from "./Entity.js";

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

    spawnProjectile(){

    }
}