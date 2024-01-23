import {Entity} from "./Entity.js";
import {Constants} from "../constants/Constants.js";

export class Enemy extends Entity{
    score;
    coinDropped;

    constructor(name, x, y, velocity, health, maxHealth, damage) {
        super(name, x, y, velocity, health, maxHealth, damage);
        this.score = 0;
        this.coinDropped = 0;
    }

    update(dt) {
        super.update(dt);
        this.y += this.velocity * dt;

        if(this.y >= Constants.TILE_SIZE_ZOOMED){

        }
    }
}