import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Goblin extends Enemy{

    constructor() {
        const health = 20;
        const velocity = 40;

        let image = new Image();
        image.src = Path.GOBLIN;
        const spriteRenderer = new SpriteRenderer(image);
        super("goblin", 0, 0, velocity, health, health, 2);
        this.addComponent(spriteRenderer)
        this.attackRate = 1;
        this.damage = 20;
        this.coinDropped = 5;
        this.score = 10;
    }
}