import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {AnnihilatorBeam} from "../projectile/AnnihilatorBeam.js";
import {Constants} from "../../../constants/Constants.js";
import {AnnihilatorVacuum} from "../projectile/AnnihilatorVacuum.js";
import {Hitmarker} from "../particle/Hitmarker.js";
import TDAchievements from "../../../achievement/TDAchievements.js";
import TDAchievementConstant from "../../../achievement/TDAchievementConstant.js";

export class Annihilator extends Tower{

    constructor() {
        const health = 500;
        const damage = 100;
        const attackRate = 0.15;

        // let image = new Image();
        // image.src = Path.ANNIHILATOR;
        // const spriteRenderer = new SpriteRenderer(image);
        super("Annihilator", 0, 0,0, health, health, damage,attackRate);
        // this.addComponent(spriteRenderer)
        this.startFire = false;
        TDAchievements.increaseCounterAndTryUnlock(TDAchievementConstant.USE_DEATH_BEAM,1);
    }


    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            this.spawnProjectile();
            this.hurt(20,this);

            this.accumulatedTime = 0;
        }
        super.updateComponents(dt);
    }


    spawnProjectile() {
        const spawnOffset = 10;
        const y  = this.y - spawnOffset;
        let projectile = new AnnihilatorBeam();
        projectile.y = Constants.height + Constants.TILE_SIZE_ZOOMED;
        projectile.x = this.x;
        projectile.damage = this.damage;
        projectile.source = this;
        Engine.addGameObject(projectile);

    }
}