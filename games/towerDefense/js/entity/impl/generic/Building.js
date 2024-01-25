import {GameObject} from "../../../GameObject.js";
import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Entity} from "../../Entity.js";

export class Building extends Tower{
    constructor(name,x,y) {
        const health = 100;
        const damage = 0;
        const attackRate = 0.0;

        let image = new Image();
        super(name, x, y,0, health, health, damage,attackRate);

    }


    onDeath() {
        console.log("END")
        super.onDeath();
    }
}