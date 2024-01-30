import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {Constants} from "../../../constants/Constants.js";

export class LowWall extends Tower{
    constructor() {
        const health = 1000;
        const damage = 0;
        const attackRate = 0;

        let image = new Image();
        image.src = Path.LOW_WALL;
        const spriteRenderer = new SpriteRenderer(image);
        super("LowWall", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
    }


}