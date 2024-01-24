//ici, quand le bouton est cliqué, on incrémente le score et on l'affiche

document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var scoreDisplay = document.getElementById('score');

    var score = 0;

    clickButton.addEventListener('click', function () {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    });
});
