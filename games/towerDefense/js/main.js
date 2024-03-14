// main.js

// Récupérer le canvas et son contexte


import {Gui} from "./gui/Gui.js";
import {Constants} from "./constants/Constants.js";
import {GameObject} from "./GameObject.js";
import {SpriteRenderer} from "./component/SpriteRenderer.js";
import {Path} from "./constants/Path.js";
import {MonsterSpawner} from "./entity/impl/generic/MonsterSpawner.js";
import {Engine} from "./constants/Engine.js";
import {MapUtils} from "./utils/MapUtils.js";
import {Utils} from "./utils/Utils.js";
import {AB_Utils} from "../../../js/AB_Utils.js";
import TDAchievements from "./achievement/TDAchievements.js";


Engine.canvas = document.getElementById("gameCanvas");
const canvas = Engine.canvas;
Engine.context = Engine.canvas.getContext("2d");
Engine.gameObjects = [];
const gui = new Gui();

export const gState = {
    MENU : 1,
    GAME : 2,
    END: 3
}

function init(){
    Engine.context.imageSmoothingEnabled = false;
    Engine.gameState = gState.GAME;


    const achievementPATH = "/games/towerDefense/asset/data/achievement.json";
    TDAchievements.init("UserID", achievementPATH);

    MapUtils.createGround();
    MapUtils.createVillage();
    //MapUtils.createTestTowers();
    MapUtils.createSpawner();


    //Apply canvas size
    canvas.width = Constants.width;
    canvas.height = Constants.height;
    console.log("width: "+canvas.width + " height:"+canvas.height);


    canvas.addEventListener('mousedown', function(e) {
        Gui.getCanvasMouseCoordinates(canvas, e)
    })

    console.log("Successfully initialized");

    AB_Utils.readTextFile("/component/scoreboard.html", (text) =>{
        AB_Utils.replaceComponent("scoreboard",text);
    });
}



// Définir la fonction de mise à jour du jeu
function updateGame(dt) {
    for (let i = 0; i < Engine.gameObjects.length; i++){
        Engine.gameObjects[i].update(dt);
    }
    //Update Graphical User Interface
    gui.update(dt);


}

// Définir la fonction de rendu du jeu
function renderGame() {
    // Effacer le canvas
    Engine.context.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les éléments du jeu ici
    for (let i = 0; i < Engine.gameObjects.length; i++){
        Engine.gameObjects[i].render();
    }

    // ctx.fillStyle = "#ffffff"; // Couleur du carré (blanc ici)
    // ctx.fillRect(50, 50, 50, 50); // Paramètres : position x, position y, largeur, hauteur
}

// G A M E  L O O P
let lastTimestamp = 0;
function gameLoop(timestamp) {
    // Mettre à jour le jeu
    const dt = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (Engine.gameState === gState.GAME){
        // Rendre le jeu
        renderGame();

        updateGame(dt);
    }else if (Engine.gameState === gState.MENU){
        console.log("MENU STATE")
    }else if (Engine.gameState === gState.END){
        renderGame();
        //TODO
        // console.log("END STATEEE")
    }

    // Appeler la boucle de jeu à nouveau
    requestAnimationFrame(gameLoop);
}



init();
// gameLoop();
requestAnimationFrame(gameLoop);