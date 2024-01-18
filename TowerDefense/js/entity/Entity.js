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

    isDead(){
        return this.health<=0;
    }

    heal(amount){
        this.health += amount;
        if(this.health>this.maxHealth){
            this.health = this.maxHealth;
        }
    }

    hurt(amount){
        this.health -= amount;
        if(this.health<=0){
            this.health = 0;
            return true; //Return true if the entity is dead
        }
        return false;
    }

}