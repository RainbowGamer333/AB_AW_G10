import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Global} from "../../../constants/Global.js";
import {Constants} from "../../../constants/Constants.js";
import {CanonBall} from "../projectile/CanonBall.js";
import {SonarBeam} from "../projectile/SonarBeam.js";

export class BidirectionalSonar extends Tower{
    constructor() {
        const health = 200;
        const damage = 50;
        const attackRate = 0.2;

        let image = new Image();
        image.src = Path.BIDIRECTIONAL_SONAR;
        const spriteRenderer = new SpriteRenderer(image);
        super("canon", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            this.spawnProjectiles();
            // this.spawnProjectiles();
            this.accumulatedTime -= this.attackRate;
        }
        super.update(dt);
    }


    spawnProjectiles() {


        const spawnOffsetY = 0;
        const spawnOffsetX = 20;
        const y  = this.y - spawnOffsetY;
        const x = this.x - spawnOffsetX;
        let projectile = new SonarBeam();
        projectile.y = y;
        projectile.x = x;
        Global.addGameObject(projectile);
    }


}