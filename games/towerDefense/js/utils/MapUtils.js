import {Path} from "../constants/Path.js";
import {Constants} from "../constants/Constants.js";
import {GameObject} from "../GameObject.js";
import {SpriteRenderer} from "../component/SpriteRenderer.js";
import {Global} from "../constants/Global.js";
import {Utils} from "./Utils.js";
import {Canon} from "../entity/impl/tower/Canon.js";

export class MapUtils {
    static createGround(){
        //Create ground
        let image = new Image();
        image.src = Path.GRASS;
        let tileCPT = 0;
        for (let i = 0; i < Constants.rows; i++) {
            for (let j = 0; j < Constants.colums; j ++){
                let tile = new GameObject("tile_"+tileCPT++,j*Constants.TILE_SIZE_ZOOMED,i*Constants.TILE_SIZE_ZOOMED);
                tile.addComponent(new SpriteRenderer(image));
                Global.addGameObject(tile);
                // console.log(tile.name + " x:"+tile.x+" y:"+tile.y);
            }
        }
    }
    static createVillage(){
        //Create Village
        let tileCPT = 0;
        let image = new Image();
        image.src = Path.HOUSE_BLUE;
        const y = Constants.height-Constants.TILE_SIZE_ZOOMED;
        for (let i=0;i<Constants.colums;i++){
            let tile = new GameObject("tile_house_"+tileCPT++,i*Constants.TILE_SIZE_ZOOMED,y);
            tile.addComponent(new SpriteRenderer(image));
            Global.addGameObject(tile);
        }
    }

    static createTestTowers(){
        let tileCPT = 0;
        let image = new Image();
        image.src = Path.HOUSE_BLUE;
        const y = Constants.height-(Constants.TILE_SIZE_ZOOMED*2);
        for (let i=0;i<Constants.colums;i++){
            let towerChoice = Utils.randomIntFromInterval(0,5);
            let tower = new Canon();
            tower.x = i*Constants.TILE_SIZE_ZOOMED;
            tower.y = y;
            Global.addGameObject(tower);
        }
    }

}