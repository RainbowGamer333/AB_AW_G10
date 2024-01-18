import {GameObject} from "../GameObject.js";

export class Entity extends GameObject{
    velocity;
    health;
    maxHealth;
    damage;
    spriteRenderer;

    constructor(name, x, y, velocity, health, maxHealth, damage, spriteRenderer) {
        super(name, x, y);
        this.velocity = velocity;
        this.health = health;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.spriteRenderer = spriteRenderer;
    }
}