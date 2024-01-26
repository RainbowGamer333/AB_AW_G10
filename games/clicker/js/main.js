document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var crossIcon = document.getElementById('crossIcon');
    var scoreDisplay = document.getElementById('score');
    var imageDisplay = document.getElementById('imageDisplay');

    var score = 0;
    var autoClicks = 0;
    var autoClickCost = 100;

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
        scoreDisplay.classList.add("trembling-animation");
        setTimeout(() => {
            scoreDisplay.classList.remove("trembling-animation");
        }, 500);

        // Vérifiez si le score est suffisant pour afficher la croix
        if (score >= autoClickCost) {
            crossIcon.classList.remove("hidden");
        }
    }

    clickButton.addEventListener('click', function () {
        score++;
        updateScore();
    });

    function toggleAutoClick() {
        if (score >= autoClickCost) {
            autoClicks = autoClics + 2;
            score -= autoClickCost; // Déduisez le coût du clic automatique
            autoClickCost += 100; // Augmentez le coût pour le prochain clic automatique
            updateScore();

            // Démarrez l'intervalle uniquement si ce n'était pas déjà en cours
            if (autoClicks === 1) {
                setInterval(function () {
                    score += autoClicks;
                    updateScore();
                }, 1000);
            }

            crossIcon.classList.add("hidden"); // Cachez la croix après avoir activé le clic automatique
        }
    }

    autoClickButton.addEventListener('click', function () {
        toggleAutoClick();
    });

    crossIcon.addEventListener('click', function () {
        toggleAutoClick();
    });
});
