document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var clickPlus1Button = document.getElementById('clickPlus1');
    var scoreDisplay = document.getElementById('score');
    var autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
    var clickPlus1CostDisplay = document.getElementById('clickPlus1CostDisplay');
    var coinsDisplay = document.getElementById('coinsDisplay');

    var score = 0;
    var autoClicks = 0;
    var clickPlus1Multiplier = 1;
    var autoClickCost = 1500;
    var clickPlus1Cost = 500;
    var coins = 0;

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
        if (pixelsRemoved < score) {
            if (pixelsRemoved === 0) { // Ajout de cette condition pour la première mise à jour du score
                pixelsRemoved = score;
            } else {
                pixelsToRemove = score - pixelsRemoved;
                removePixel();
            }
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
            updateScore();

            hasReachedButtonOne = true;
        }
    }

    clickButton.addEventListener('click', function () {
        incrementScore(clickPlus1Multiplier);
        incrementCoins(clickPlus1Multiplier);
    });

    autoClickButton.addEventListener('click', function () {
        toggleAutoClick();
    });

    clickPlus1Button.addEventListener('click', function () {
        toggleClickPlus1();
    });

    updateButton();
    updateScore();

    //////////////////////////////image//////////////

    // Variables de référence
    var imageContainer = document.getElementById('imageContainer');
    var image = document.getElementById('images');
    var pixelsToRemove = 0;
    var pixelsRemoved = 0;

    // Fonction pour calculer la taille de l'image et mettre en place le rectangle
    function setupRectangle() {
        var rect = image.getBoundingClientRect();
        var rectDiv = document.createElement('div');
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
        var rect = image.getBoundingClientRect();
        var pixelSize = 1;
        var numPixels = Math.ceil(rect.width * rect.height / 100);
        if (pixelsToRemove > numPixels) {
            pixelsToRemove = numPixels;
        }
        for (var i = 0; i < pixelsToRemove; i++) {
            var pixel = document.createElement('div');
            pixel.style.position = 'absolute';
            pixel.style.width = pixelSize + 'px';
            pixel.style.height = pixelSize + 'px';
            pixel.style.backgroundColor = 'white'; // Modifier la couleur du pixel en transparent
            var x = Math.random() * rect.width;
            var y = Math.random() * rect.height;
            pixel.style.left = rect.left + x + 'px';
            pixel.style.top = rect.top + y + 'px';
            imageContainer.appendChild(pixel);
            pixelsRemoved++;
        }
        pixelsToRemove = 0;
        scoreDisplay.textContent = 'Score: ' + score;
    }

    // Initialisation
    setupRectangle();
});



