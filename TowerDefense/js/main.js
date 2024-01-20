// main.js

// Récupérer le canvas et son contexte


import {Gui} from "./gui/Gui.js";
import {Constants} from "./constants/Constants.js";
import {GameObject} from "./GameObject.js";
import {SpriteRenderer} from "./component/SpriteRenderer.js";
import {Path} from "./constants/Path.js";
import {MonsterSpawner} from "./entity/impl/generic/MonsterSpawner.js";
import {Global} from "./constants/Global.js";

Global.canvas = document.getElementById("gameCanvas");
const canvas = Global.canvas;
Global.context = Global.canvas.getContext("2d");
Global.gameObjects = [];
const gui = new Gui();


function init(){
    Global.context.imageSmoothingEnabled = false;



    //Create ground
    let image = new Image();
    image.src = Path.GRASS;
    let tileCPT = 0;
    for (let i = 0; i < Constants.rows; i++) {
        for (let j = 0; j < Constants.colums; j ++){
            let tile = new GameObject("tile_"+tileCPT++,j*Constants.TILE_SIZE_ZOOMED,i*Constants.TILE_SIZE_ZOOMED);
            tile.addComponent(new SpriteRenderer(image));
            Global.gameObjects.push(tile);
            // console.log(tile.name + " x:"+tile.x+" y:"+tile.y);
        }
    }
    for (let i=0;i<Constants.colums;i++){
        
    }

    //Create the enemy spawner
    Global.gameObjects.push(new MonsterSpawner("MonsterSpawner",0,0));

    //Apply canvas size
    canvas.width = Constants.width;
    canvas.height = Constants.height;
    console.log(canvas.width + " x:"+canvas.height);


    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e)
    })

    console.log("Successfully initialized");
}



// Définir la fonction de mise à jour du jeu
function updateGame(dt) {
    // Update Game objects
    for (let i = 0; i < Global.gameObjects.length; i++){
        Global.gameObjects[i].update(dt);
    }

    //Update Graphical User Interface
    gui.update(dt);
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

    updateGame(dt);

    // Rendre le jeu
    renderGame();

    // Appeler la boucle de jeu à nouveau
    requestAnimationFrame(gameLoop);
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left ;
    const y = event.clientY - rect.top ;

    let tileX = x/Constants.TILE_SIZE_ZOOMED;
    let tileY =y/Constants.TILE_SIZE_ZOOMED;


}


init();
// gameLoop();
requestAnimationFrame(gameLoop);