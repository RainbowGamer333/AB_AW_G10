/////////////////////////////partie clicker/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var clickPlus1Button = document.getElementById('clickPlus1');
    var scoreDisplay = document.getElementById('score');
    var autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
    var clickPlus1CostDisplay = document.getElementById('clickPlus1CostDisplay'); // Correction ici
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
///////////////////partie image/////////////////////////////

    var imageDisplay = document.getElementById('imageDisplay');
    var imageSize = 512;
    var pixelsVisibility = new Array(imageSize * imageSize).fill(false);

    function updateImage() {
        var imageHTML = '';

        for (var i = 0; i < pixelsVisibility.length; i++) {
            if (pixelsVisibility[i]) {
                imageHTML += '<div class="pixel"></div>';
            } else {
                imageHTML += '<div class="pixel hidden"></div>';
            }
        }

        imageDisplay.innerHTML = imageHTML;
    }

    function getRandomPixel() {
        var randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * (imageSize * imageSize));
        } while (pixelsVisibility[randomIndex]);

        return randomIndex;
    }

    function revealRandomPixel() {
        var randomPixel = getRandomPixel();
        pixelsVisibility[randomPixel] = true;
        updateImage();
    }

    // Ajoutez cet événement de clic au bouton clickButton (ou à toute autre action de clic que vous utilisez)
    clickButton.addEventListener('click', function () {
        incrementScore(clickPlus1Multiplier);
        incrementCoins(clickPlus1Multiplier);
        revealRandomPixel();
    });

    updateImage();


});

