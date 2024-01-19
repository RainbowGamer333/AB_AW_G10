import {Enemy} from "../Enemy.js";
import {Path} from "../../constants/Path.js";
import {SpriteRenderer} from "../../component/SpriteRenderer.js";

export class Necromancer extends Enemy {
    constructor() {
        const health = 2000;
        const velocity = 3;
        const damage = 50;
        const attackRate = 10;

        let image = new Image();
        image.src = Path.NECROMANCER;
        const spriteRenderer = new SpriteRenderer(image);
        super("demon", 0, 0, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
    }
}