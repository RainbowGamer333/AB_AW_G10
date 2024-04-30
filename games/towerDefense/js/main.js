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
import AchievementUtils from "../../../js/AchievementUtils.js";
import {ScoreboardTowerDefense} from "./js/Scoreboard.js";

Engine.canvas = document.getElementById("gameCanvas");
const canvas = Engine.canvas;
Engine.context = Engine.canvas.getContext("2d");
Engine.gameObjects = [];
let gui = new Gui();
let account = null;

export const gState = {
    MENU : 1,
    GAME : 2,
    END: 3
}

function init(){
    account = JSON.parse(sessionStorage.getItem("account"));
    if (account === null) window.location.href = "/AB_AW_G10/account/log-in.html";

    Engine.context.imageSmoothingEnabled = false;
    Engine.gameState = gState.MENU;
    displayHomeScreen();

    
    // initialiserScoresTowerDefense();
    AchievementUtils.init("towerDefense");

    MapUtils.createGround();
    MapUtils.createVillage();
    //MapUtils.createTestTowers();
    MapUtils.createSpawner();


    const homeElement = document.getElementById("gameState_HomeScreen");
    homeElement.querySelector("#startGame");
    homeElement.addEventListener( "click",() => {
        setTimeout(displayGame,50);
        // displayGame();
    })

    //Enable reset buttons
    const resetButtonElement = document.getElementById("resetGame");
    const newGameButtonElement = document.getElementById("newGame");
    resetButtonElement.addEventListener( "click",() => {
        resetGame();
    })
    newGameButtonElement.addEventListener( "click",() => {
        resetGame();
    })

}

function resetGame() {
    location.reload();
    // Engine.gameObjects = [];
    // Engine.villageHousesAlive = [];
    // Engine.villageHealth = 0;
    // Engine.maxVillageHealth = 0;
    // // gui = new Gui();
    // init();
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
        // Rendre le jeu (le dessiner -> côté front)
        renderGame();

        updateGame(dt); //mettre a jour le jeu (coté back)
    }else if (Engine.gameState === gState.MENU){
        console.log("MENU STATE")
        displayHomeScreen();
        return;
    }else if (Engine.gameState === gState.END){
        renderGame();

        displayEndScreen();
        return;
        //TODO
        // console.log("END STATEEE")
    }

    // Appeler la boucle de jeu à nouveau
    requestAnimationFrame(gameLoop);
}

function displayHomeScreen(){
    Engine.gameState = gState.MENU;
    const inGameElement = document.getElementById("gameState_InGame");
    const endGameElement = document.getElementById("gameState_EndScreen");
    const homeElement = document.getElementById("gameState_HomeScreen");
    inGameElement.style.display = "none";
    endGameElement.style.display = "none";
    homeElement.style.display = "flex";
}

function displayEndScreen(){
    Engine.gameState = gState.END;

    ScoreboardTowerDefense.updateScore(account.username,Engine.score)//TODO implément

    const inGameElement = document.getElementById("gameState_InGame");
    const endGameElement = document.getElementById("gameState_EndScreen");
    inGameElement.style.display = "none";
    endGameElement.style.display = "flex";

    const scoreElement = endGameElement.querySelector("span.scoreMessage");
    scoreElement.innerText = "Score: " + Engine.score;
}

function displayGame(){
    Engine.gameState = gState.GAME;
    const inGameElement = document.getElementById("gameState_InGame");
    const endGameElement = document.getElementById("gameState_EndScreen");
    const homeElement = document.getElementById("gameState_HomeScreen");
    endGameElement.style.display = "none";
    homeElement.style.display = "none";
    inGameElement.style.display = "flex";

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

    requestAnimationFrame(gameLoop);

}



init();
// gameLoop();
