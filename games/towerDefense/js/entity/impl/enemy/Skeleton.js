import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Skeleton extends Enemy{
    constructor(x,y) {
        const health = 1;
        const velocity = 50;
        const damage = 10;
        const attackRate = 4;

        let image = new Image();
        image.src = Path.SKELETON;
        const spriteRenderer = new SpriteRenderer(image);
        super("skeleton", x, y, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.score = 1;
    }
}