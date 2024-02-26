document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var clickPlus1Button = document.getElementById('clickPlus1');
    var scoreDisplay = document.getElementById('score');
    var autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
    var clickPlus1CostDisplay = document.getElementById('clickPlus1CostDisplay');
    var coinsDisplay = document.getElementById('coinsDisplay');
    var cpsDisplay = document.getElementById('cpsDisplay');
    var nextClickValueDisplay = document.getElementById('nextClickValueDisplay'); // Ajout de l'affichage de la prochaine valeur de clic

    var score = 0;
    var autoClicks = 0;
    var clickPlus1Multiplier = 1;
    var autoClickCost = 1500;
    var clickPlus1Cost = 500;
    var coins = 0;
    var cps = 0;
    var nextClickValue = clickPlus1Multiplier; // Initialisation de la prochaine valeur de clic

    var hasReachedButtonOne = false;
    var hasReachedButtonTwo = false;

    function updateButton() {
        if (coins >= autoClickCost) {
            autoClickButton.removeAttribute('disabled');
        } else {
            autoClickButton.setAttribute('disabled', 'disabled');
        }

        if (score >= 300 || hasReachedButtonOne) {
            clickPlus1Button.classList.remove('hidden');
            clickPlus1CostDisplay.classList.remove('hidden');
        } else {
            clickPlus1Button.classList.add('hidden');
        }
        if (score >= 1000 || hasReachedButtonTwo) {
            autoClickButton.classList.remove('hidden');
            autoClickCostDisplay.classList.remove('hidden');
        } else {
            autoClickButton.classList.add('hidden');
        }
    }

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
        scoreDisplay.classList.add("trembling-animation");
        setTimeout(() => {
            scoreDisplay.classList.remove("trembling-animation");
        }, 500);

        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        clickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
        updateCoins();
        updateButton();
        console.log('Score: ' + score);

        if (score >= 100 && rectDiv) {
            imageContainer.removeChild(rectDiv); // Supprime le rectangle lorsque le score atteint 100
            rectDiv = null;
        }
    }

    function updateCoins() {
        coinsDisplay.textContent = 'Pièces: ' + coins;
        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        clickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
        console.log("Coins: " + coins);
    }

    function incrementScore(amount) {
        score += amount;
        updateScore();
    }

    function incrementCoins(amount) {
        coins += amount;
        updateCoins();
    }

    function toggleAutoClick() {
        if (coins >= autoClickCost) {
            autoClicks += 1;
            coins -= autoClickCost;
            autoClickCost += 1500;
            updateScore();

            if (autoClicks === 1) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                }, 750);
            }
            hasReachedButtonTwo = true;
        }
    }

    function toggleClickPlus1() {
        if (coins >= clickPlus1Cost) {
            coins -= clickPlus1Cost;
            clickPlus1Cost += 150;
            clickPlus1Multiplier++;
            nextClickValue = clickPlus1Multiplier; // Met à jour la prochaine valeur de clic
            updateScore();

            hasReachedButtonOne = true;
        }
    }

    clickButton.addEventListener('click', function () {
        incrementScore(nextClickValue); // Utilise la prochaine valeur de clic pour incrémenter le score
        incrementCoins(nextClickValue);
        cps++;
        nextClickValueDisplay.textContent = 'ajout de :  ' + nextClickValue; // Met à jour l'affichage de la prochaine valeur de clic
    });

    autoClickButton.addEventListener('click', function () {
        toggleAutoClick();
    });

    clickPlus1Button.addEventListener('click', function () {
        toggleClickPlus1();
    });

    updateButton();
    updateScore();

    setInterval(function () {
        cpsDisplay.textContent = 'Clics par seconde: ' + cps;
        cps = 0;
    }, 1000);

    //////////////////////////////image//////////////

    // Variables de référence
    var imageContainer = document.getElementById('imageContainer');
    var image = document.getElementById('images');
    var pixelsRemoved = 0;

    // Fonction pour calculer la taille de l'image et mettre en place le rectangle
    function setupRectangle() {
        var image = document.getElementById('images');
        var rect = image.getBoundingClientRect();
        rectDiv = document.createElement('div');
        rectDiv.style.position = 'absolute';
        rectDiv.style.top = rect.top + 'px';
        rectDiv.style.left = rect.left + 'px';
        rectDiv.style.width = rect.width + 'px';
        rectDiv.style.height = rect.height + 'px';
        rectDiv.style.backgroundColor = 'black';
        rectDiv.style.opacity = '1';
        rectDiv.style.pointerEvents = 'none';
        imageContainer.appendChild(rectDiv);
    }


    // Fonction pour supprimer les pixels aléatoirement
    function removePixel() {
        incrementScore(1); // Incrémente le score lorsque des pixels sont supprimés
        pixelsRemoved++;
        scoreDisplay.textContent = 'Score: ' + score; // Met à jour l'affichage du score
    }

    // Initialisation
    setupRectangle();
});
