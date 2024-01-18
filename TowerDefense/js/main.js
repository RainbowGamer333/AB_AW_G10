// main.js

// Récupérer le canvas et son contexte


import {Gui} from "./gui/Gui.js";
import {Constants} from "./constants/Constants.js";
import {GameObject} from "./GameObject.js";
import {SpriteRenderer} from "./component/SpriteRenderer.js";
import {Path} from "./constants/Path.js";

const canvas = document.getElementById("gameCanvas");
const  ctx = canvas.getContext("2d");
const gameObjects = [];
const gui = new Gui();


function init(){
    ctx.imageSmoothingEnabled = false;



    //Create ground
    let image = new Image();
    image.src = Path.GRASS;


    let tileCPT = 0;
    for (let i = 0; i < Constants.colums; i++) {
        for (let j = 0; j < Constants.rows; j ++){
            let tile = new GameObject("tile_"+tileCPT++,i*Constants.TILE_SIZE_ZOOMED,j*Constants.TILE_SIZE_ZOOMED);
            tile.addComponent(new SpriteRenderer(ctx,image));
            gameObjects.push(tile);
            // console.log(tile.name + " x:"+tile.x+" y:"+tile.y);
        }
    }

    //Apply canvas size
    canvas.width = Constants.width;
    canvas.height = Constants.height;

    console.log("Successfully initialized");
}



// Définir la fonction de mise à jour du jeu
function updateGame() {
    // Mettez à jour la logique du jeu ici

    // Exemple : déplacer les ennemis, vérifier les collisions, etc.
    for (let i = 0; i < gameObjects.length; i++){
        gameObjects[i].update();
    }
}

// Définir la fonction de rendu du jeu
function renderGame() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les éléments du jeu ici
    for (let i = 0; i < gameObjects.length; i++){
        gameObjects[i].render();
    }

    // // Exemple : dessiner les tours, les ennemis, etc.
    // ctx.fillStyle = "#ffffff"; // Couleur du carré (blanc ici)
    // ctx.fillRect(50, 50, 50, 50); // Paramètres : position x, position y, largeur, hauteur
}

// Définir la fonction principale de la boucle de jeu
function gameLoop() {
    // Mettre à jour le jeu
    updateGame();

    // Rendre le jeu
    renderGame();

    // Appeler la boucle de jeu à nouveau
    requestAnimationFrame(gameLoop);
}

init();
gameLoop();