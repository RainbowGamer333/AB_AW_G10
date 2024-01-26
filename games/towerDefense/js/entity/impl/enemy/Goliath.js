import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Goliath extends Enemy{
    constructor() {
        const health = 2000;
        const velocity = 1;
        const damage = 2;
        const attackRate = 9;

        let image = new Image();
        image.src = Path.GOLIATH;
        const spriteRenderer = new SpriteRenderer(image);
        super("goliath", 0, 0, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.score = 250;
        this.coinDropped = 100;
    }
}