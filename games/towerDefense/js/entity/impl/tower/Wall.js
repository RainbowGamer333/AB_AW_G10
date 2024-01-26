import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";

export class Wall extends Tower{
    constructor() {
        const health = 2000;
        const damage = 0;
        const attackRate = 0;

        let image = new Image();
        image.src = Path.WALL;
        const spriteRenderer = new SpriteRenderer(image);
        super("Wall", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
    }


}