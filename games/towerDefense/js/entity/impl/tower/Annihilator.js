import {Tower} from "../../Tower.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";
import {Fireball} from "../projectile/Fireball.js";
import {Engine} from "../../../constants/Engine.js";
import {AnnihilatorBeam} from "../projectile/AnnihilatorBeam.js";
import {Constants} from "../../../constants/Constants.js";
import {AnnihilatorVacuum} from "../projectile/AnnihilatorVacuum.js";

export class Annihilator extends Tower{
    startFire;
    constructor() {
        const health = 500;
        const damage = 100;
        const attackRate = 0.15;

        let image = new Image();
        image.src = Path.ANNIHILATOR;
        const spriteRenderer = new SpriteRenderer(image);
        super("Annihilator", 0, 0,0, health, health, damage,attackRate);
        this.addComponent(spriteRenderer)
        this.startFire = false;
    }


    update(dt) {
        this.accumulatedTime+=dt;
        if (this.accumulatedTime>=this.attackRate){
            this.spawnVacuum();

            if (this.startFire){
                this.spawnProjectile();
                this.hurt(20,this);
            }
            this.accumulatedTime = 0;
        }
        super.updateComponents(dt);
    }


    spawnProjectile() {
        const spawnOffset = 10;
        const y  = this.y - spawnOffset;
        let projectile = new AnnihilatorBeam();
        projectile.y = y;
        projectile.x = this.x;
        projectile.damage = this.damage;
        projectile.source = this;
        Engine.addGameObject(projectile);

    }

    spawnVacuum(){
        const spawnOffset = 10;
        const y  = this.y - spawnOffset;
        let projectile = new AnnihilatorVacuum(this);
        projectile.y = Constants.height;
        projectile.x = this.x;
        projectile.damage = this.damage;
        projectile.deadzone = this.y ;
        Engine.addGameObject(projectile);
    }
}