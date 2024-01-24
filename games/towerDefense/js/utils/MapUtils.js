import {Path} from "../constants/Path.js";
import {Constants} from "../constants/Constants.js";
import {GameObject} from "../GameObject.js";
import {SpriteRenderer} from "../component/SpriteRenderer.js";
import {Global} from "../constants/Global.js";
import {Utils} from "./Utils.js";
import {Canon} from "../entity/impl/tower/Canon.js";
import {MonsterSpawner} from "../entity/impl/generic/MonsterSpawner.js";
import {Building} from "../entity/impl/generic/Building.js";

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


        let images = [];
        let image = new Image();
        image.src = Path.HOUSE_BLUE;
        images.push(image);
        image = new Image();
        image.src = Path.HOUSE_RED;
        images.push(image);
        image = new Image();
        image.src = Path.FOUNTAIN;
        images.push(image);
        image = new Image();
        image.src = Path.HOUSE_TINY;
        images.push(image);
        image = new Image();
        image.src = Path.HOUSE_TINY_TINY;
        images.push(image);

        const y = Constants.height-Constants.TILE_SIZE_ZOOMED;
        for (let i=0;i<Constants.colums;i++){
            const imageChoice = Utils.randomIntFromInterval(0,images.length-1);

            let villageBuilding = new Building("tile_building_"+tileCPT++,i*Constants.TILE_SIZE_ZOOMED,y);
            villageBuilding.addComponent(new SpriteRenderer(images[imageChoice]));
            Global.addGameObject(villageBuilding);
        }
    }

    static createTestTowers(){
        let tileCPT = 0;
        let image = new Image();
        image.src = Path.HOUSE_BLUE;
        const y = Constants.height-(Constants.TILE_SIZE_ZOOMED*2);
        // for (let i=0;i<Constants.colums;i++){
        //     let towerChoice = Utils.randomIntFromInterval(0,5);
        //     let tower = new Canon();
        //     tower.x = i*Constants.TILE_SIZE_ZOOMED;
        //     tower.y = y;
        //     Global.addGameObject(tower);
        // }
        let tower = new Canon();
        tower.x = 0*Constants.TILE_SIZE_ZOOMED;
        tower.y = y;
        Global.addGameObject(tower);
    }

    static createSpawner(){
        Global.gameObjects.push(new MonsterSpawner("MonsterSpawner",0,0));
    }

}