import {Entity} from "./Entity.js";

export class Tower extends Entity {
    accumulatedTime = 0.0;

    constructor(name, x, y, velocity, health, maxHealth, damage, attackRate) {
        super(name, x, y, velocity, health, maxHealth, damage, attackRate);
    }

    spawnProjectile(){

    }
}