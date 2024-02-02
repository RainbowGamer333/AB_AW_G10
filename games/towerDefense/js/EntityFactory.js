import {Tower} from "./entity/Tower.js";
import {Enemy} from "./entity/Enemy.js";
import {Path} from "./constants/Path.js";
import {SpriteRenderer} from "./component/SpriteRenderer.js";
import {Constants} from "./constants/Constants.js";
import {Engine} from "./constants/Engine.js";
import {Clickable} from "./component/Clickable.js";

export class EntityFactory {
    static create_tower(){
        // const entity = new Tower();
        //TODO
    }

    static create_monster(){
        let image = new Image();
        image.src = Path.OGRE;
        const spriteRenderer = new SpriteRenderer(image);

        const clickable = new Clickable()

        const entity = new Enemy("monster_with_no_name",0,0,70,100,100,3);
        entity.addComponent(spriteRenderer);
        entity.addComponent(clickable);

        return entity;
    }
}