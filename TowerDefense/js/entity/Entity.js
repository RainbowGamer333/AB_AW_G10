import {GameObject} from "../GameObject.js";
import {Global} from "../constants/Global.js";

export class Entity extends GameObject{
    velocity;
    health;
    maxHealth;
    damage;
    spriteRenderer;
    isAlive = true;

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
            this.onDeath();
            this.isAlive = false;
        }
        this.isAlive = true;
    }

    onDeath(){
        console.log(this.name+" is dead.");
        Global.removeGameObject(this);
    }

    onClick(){
        this.hurt(50);
        if (this.isAlive){
            Global.coinBalance += 1;
        }
    }

}