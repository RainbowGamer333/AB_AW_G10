import {Entity} from "./Entity.js";
import {Constants} from "../constants/Constants.js";

export class Enemy extends Entity{

    constructor(name, x, y, velocity, health, maxHealth, damage) {
        super(name, x, y, velocity, health, maxHealth, damage);
    }

    update(dt) {
        super.update(dt);
        this.y += this.velocity * dt;

        if(this.y >= Constants.TILE_SIZE_ZOOMED){

        }
    }
}