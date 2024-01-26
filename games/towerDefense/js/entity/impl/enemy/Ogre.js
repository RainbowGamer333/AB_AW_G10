import {Enemy} from "../../Enemy.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Ogre extends Enemy {
    constructor() {
        const health = 200;
        const velocity = 5;
        const damage = 50;
        const attackRate = 4;

        let image = new Image();
        image.src = Path.OGRE;
        const spriteRenderer = new SpriteRenderer(image);
        super("ogre", 0, 0, velocity, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.score = 100;
        this.coinDropped = 50;
    }
}