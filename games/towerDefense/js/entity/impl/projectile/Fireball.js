import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";

export class Fireball extends Projectile{
    lastEnemyTouched;
    constructor() {
        const name = "fireball";
        const velocity = 180;
        const damage = 100;
        super(name, 0, 0, velocity, damage, null);

        let image = new Image();
        image.src = Path.FIREBALL;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        super.update(dt);
    }


    onTargetTouched(target) {
        if (!this.lastEnemyTouched){//If first enemy touched
            target.hurt(this.damage,this);
            if(target.health>this.damage){//If the entity will not be killed
                this.lastEnemyTouched = target;
                this.damage*=0.8;
                this.velocity*=0.5;
            }
            // const spr = this.getComponent(SpriteRenderer.className);
            // if (spr){
            //     let image = new Image();
            //     image.src = Path.FIREBALL_SMALL;
            //     spr.texture = image;
            // }else {
            //     console.warn("NO SPR FOUND!")
            // }

        }else if(this.lastEnemyTouched.id !== target.id){
            super.onTargetTouched(target);
        }

    }
}