// main.js

// Récupérer le canvas et son contexte
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameObjects = [];

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

    // Exemple : dessiner les tours, les ennemis, etc.
    ctx.fillStyle = "#ffffff"; // Couleur du carré (blanc ici)
    ctx.fillRect(50, 50, 50, 50); // Paramètres : position x, position y, largeur, hauteur
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

// Lancer la boucle de jeu
gameLoop();