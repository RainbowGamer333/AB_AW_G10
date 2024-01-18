import {Entity} from "./Entity.js";

export class Enemy extends Entity{

    constructor(name, x, y, velocity, health, maxHealth, damage, spriteRenderer) {
        super(name, x, y, velocity, health, maxHealth, damage, spriteRenderer);
    }
}