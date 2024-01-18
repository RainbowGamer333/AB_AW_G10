// main.js

// Récupérer le canvas et son contexte


import {Gui} from "./gui/Gui.js";
import {Constants} from "./constants/Constants.js";
import {GameObject} from "./GameObject.js";
import {SpriteRenderer} from "./component/SpriteRenderer.js";
import {Path} from "./constants/Path.js";
import {MonsterSpawner} from "./entity/MonsterSpawner.js";

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
    for (let i = 0; i < Constants.rows; i++) {
        for (let j = 0; j < Constants.colums; j ++){
            let tile = new GameObject("tile_"+tileCPT++,j*Constants.TILE_SIZE_ZOOMED,i*Constants.TILE_SIZE_ZOOMED);
            tile.addComponent(new SpriteRenderer(ctx,image));
            gameObjects.push(tile);
            // console.log(tile.name + " x:"+tile.x+" y:"+tile.y);
        }
    }

    //Create the monster spawner
    gameObjects.push(new MonsterSpawner("MonsterSpawner",0,0));

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
    // Mettez à jour la logique du jeu ici

    // Exemple : déplacer les ennemis, vérifier les collisions, etc.
    for (let i = 0; i < gameObjects.length; i++){
        gameObjects[i].update(dt);
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


// Ajouter un gestionnaire d'événements de clic au canvas
canvas.addEventListener("click", function(event) {
    // Récupérer les coordonnées du clic par rapport au canvas en pixels
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // Ajuster les coordonnées en fonction de la différence de taille entre le canvas HTML et le canvas en pixels
    const scaleX = canvas.width / canvas.clientWidth;
    const scaleY = canvas.height / canvas.clientHeight;
    const adjustedMouseX = mouseX * scaleX;
    const adjustedMouseY = mouseY * scaleY;

    // Vérifier quel sprite a été cliqué
    for (const sprite of gameObjects) {
        if (
            adjustedMouseX >= sprite.x &&
            adjustedMouseX <= sprite.x + Constants.TILE_SIZE_ZOOMED &&
            adjustedMouseY >= sprite.y &&
            adjustedMouseY <= sprite.y + Constants.TILE_SIZE_ZOOMED
        ) {
            console.log("Sprite cliqué :"+sprite.name+ " x: "+sprite.x+" y: "+sprite.y);
            // Faites quelque chose avec le sprite cliqué
            break; // Vous pouvez arrêter la recherche si un sprite est trouvé
        }
    }
});

init();
// gameLoop();
requestAnimationFrame(gameLoop);