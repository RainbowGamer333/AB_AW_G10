import {GameObject} from "../GameObject.js";

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
    }
}