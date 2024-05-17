import {Projectile} from "../../Projectile.js";
import {Path} from "../../../constants/Path.js";
import {SpriteRenderer} from "../../../component/SpriteRenderer.js";


export class AnnihilatorVacuum extends Projectile{
    annihilator;

    constructor(annihilator) {
        const name = "AnnihilatorVacuum";
        const velocity = 300;
        const damage = 0;
        super(name, 0, 0, velocity, damage, null);
        this.annihilator = annihilator;

        let image = new Image();
        image.src = Path.ANNIHILATOR_VACUUM;
        const spriteRenderer = new SpriteRenderer(image);
        this.addComponent(spriteRenderer)
    }


    update(dt) {
        super.update(dt);
    }

    onTargetTouched(target) {
        target.y -= 3;
        // super.onTargetTouched(target);
    }


    onDeath() {
        this.annihilator.startFire = true;
        super.onDeath();
    }
}