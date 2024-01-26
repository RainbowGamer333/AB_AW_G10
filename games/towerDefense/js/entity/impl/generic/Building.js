import {GameObject} from "../../../GameObject.js";
import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Entity} from "../../Entity.js";
import {Global} from "../../../constants/Global.js";

export class Building extends Tower{
    constructor(name,x,y) {
        const health = 100;
        const damage = 0;
        const attackRate = 0.0;

        let image = new Image();
        super(name, x, y,0, health, health, damage,attackRate);

    }


    hurt(amount) {
        Global.villageHealth -= amount;
        if (Global.villageHealth < 0) Global.villageHealth = 0;
        super.hurt(amount);

    }

    onDeath() {
        console.log("END")
        // Global.villageHealth = 0;
        console.log(Global.villageHealth)
        super.onDeath();
    }
}