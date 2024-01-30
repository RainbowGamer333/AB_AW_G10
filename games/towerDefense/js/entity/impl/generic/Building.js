import {GameObject} from "../../../GameObject.js";
import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Entity} from "../../Entity.js";
import {Engine} from "../../../constants/Engine.js";

export class Building extends Tower{
    constructor(name,x,y) {
        const health = 100;
        const damage = 0;
        const attackRate = 0.0;

        let image = new Image();
        super(name, x, y,0, health, health, damage,attackRate);

    }


    hurt(amount) {
       Engine.hurtVillage(amount);
       super.hurt(amount);
0
    }

    onDeath() {
        console.log(Engine.villageHealth)
        Engine.villageHousesAlive[this.getColumn()] = false;
        super.onDeath();
    }
}