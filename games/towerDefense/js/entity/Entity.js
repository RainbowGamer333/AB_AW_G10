import {GameObject} from "../GameObject.js";
import {Engine} from "../constants/Engine.js";
// import {Ghost} from "./impl/particle/Ghost.js";

export class Entity extends GameObject{
    velocity = 20;
    health = 100;
    maxHealth = 100;
    damage = 5;
    attackRate = 1;
    isAlive = true;

    velocityMultiplier = 1;

    constructor(name, x, y, velocity, health, maxHealth, damage,attackRate) {
        super(name, x, y);
        this.velocity = velocity;
        this.health = health;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.attackRate = attackRate;
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

    hurt(amount,source){
        this.health -= amount;
        if(this.health<=0){
            this.health = 0;
            this.onDeath();
            this.isAlive = false;
        }
        this.isAlive = true;
    }

    kill(){
        this.hurt(this.health);
    }


    onDeath(){
        // console.log(this.name+" is dead.");
        Engine.removeGameObject(this);
    }

    onClick(){
        this.hurt(1,null);
        if (this.isAlive){
            Engine.coinBalance += 1;
        }
    }



}