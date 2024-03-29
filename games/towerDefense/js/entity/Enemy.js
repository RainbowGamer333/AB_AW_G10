import {Entity} from "./Entity.js";
import {Constants} from "../constants/Constants.js";
import {Engine} from "../constants/Engine.js";
import {Tower} from "./Tower.js";
import {Ghost} from "./impl/particle/Ghost.js";
import {Hitmarker} from "./impl/particle/Hitmarker.js";


export class Enemy extends Entity{
    score;
    coinDropped;
    accumulatedTime = 0.0;

    constructor(name, x, y, velocity, health, maxHealth, damage) {
        super(name, x, y, velocity, health, maxHealth, damage);
        this.score = 0;
        this.coinDropped = 0;
        this.attackRate = 1;
    }

    update(dt) {
        super.update(dt);


        let isColliding = false;
        for (let i = 0; i < Engine.gameObjects.length; i++) {
            let gameObject = Engine.gameObjects[i];
            // console.log(this.y)
            if (gameObject.x === this.x && Enemy.isTarget(gameObject)){ // if they are on the same line
                if (gameObject.y >= this.y // TOP LEFT
                    && gameObject.y <= this.y + Constants.TILE_SIZE_ZOOMED ){
                    this.accumulatedTime+=dt;
                    isColliding= true;
                    if(this.accumulatedTime>=this.attackRate){
                        gameObject.hurt(this.damage,this);
                        this.accumulatedTime -= this.attackRate;
                        break;
                    }
                }
            }
        }
        if(!isColliding){
            this.y +=  this.velocity * dt;
        }

        if (this.y >= Constants.height+Constants.TILE_SIZE_ZOOMED ){
            Engine.removeGameObject(this);
        }
    }


    onDeath() {
        Engine.score+=this.score;
        Engine.coinBalance+=this.coinDropped;
        this.spawnParticleGhost();
        super.onDeath();
    }

   static isTarget(gameObject) {
       return gameObject instanceof Tower ;
    }


    hurt(amount, source) {
        super.hurt(amount, source);
        if(!this.isDead()){
            this.spawnParticleHitmarker();
        }
    }

    spawnParticleGhost(){
        const ghost = new Ghost(this.x,this.y);
        Engine.addGameObject(ghost);
    }

    spawnParticleHitmarker(){
        const hm = new Hitmarker(this.x,this.y);
        Engine.addGameObject(hm);
    }


}