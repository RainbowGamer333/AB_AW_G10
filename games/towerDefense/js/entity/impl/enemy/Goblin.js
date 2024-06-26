import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Goblin extends Enemy{

    constructor() {
        const health = 80;
        const velocity = 35;

        let image = new Image();
        image.src = Path.GOBLIN;
        const spriteRenderer = new SpriteRenderer(image);
        super("goblin", 0, 0, velocity, health, health, 2);
        this.addComponent(spriteRenderer)
        this.attackRate = 2.5;
        this.damage = 25;
        this.coinDropped = 7;
        this.score = 10;
    }
}