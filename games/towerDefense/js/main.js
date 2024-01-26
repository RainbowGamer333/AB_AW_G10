// main.js

// Récupérer le canvas et son contexte


import {Gui} from "./gui/Gui.js";
import {Constants} from "./constants/Constants.js";
import {GameObject} from "./GameObject.js";
import {SpriteRenderer} from "./component/SpriteRenderer.js";
import {Path} from "./constants/Path.js";
import {MonsterSpawner} from "./entity/impl/generic/MonsterSpawner.js";
import {Global} from "./constants/Global.js";
import {MapUtils} from "./utils/MapUtils.js";


Global.canvas = document.getElementById("gameCanvas");
const canvas = Global.canvas;
Global.context = Global.canvas.getContext("2d");
Global.gameObjects = [];
const gui = new Gui();
let gameState = null;
const gState = {
    MENU : 1,
    GAME : 2,
    END: 2
}

function init(){
    Global.context.imageSmoothingEnabled = false;
    gameState = gState.GAME;



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
}



// Définir la fonction de mise à jour du jeu
function updateGame(dt) {
    if (gameState === gState.GAME){
        // Update Game objects
        for (let i = 0; i < Global.gameObjects.length; i++){
            Global.gameObjects[i].update(dt);
        }

        //Update Graphical User Interface
        gui.update(dt);
    }else if (gameState === gState.MENU){

    }else if (gameState === gState.END){

    }

}

// Définir la fonction de rendu du jeu
function renderGame() {
    // Effacer le canvas
    Global.context.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les éléments du jeu ici
    for (let i = 0; i < Global.gameObjects.length; i++){
        Global.gameObjects[i].render();
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



    // Rendre le jeu
    renderGame();

    updateGame(dt);

    // Appeler la boucle de jeu à nouveau
    requestAnimationFrame(gameLoop);
}



init();
// gameLoop();
requestAnimationFrame(gameLoop);