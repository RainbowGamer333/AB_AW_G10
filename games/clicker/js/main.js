document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var clickPlus1Button = document.getElementById('clickPlus1');
    var scoreDisplay = document.getElementById('score');
    var autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
    var autoClickPlus1CostDisplay = document.getElementById('autoClickPlus1CostDisplay');
    var coinsDisplay = document.getElementById('coinsDisplay');

    var score = 0;
    var autoClicks = 0;
    var clickPlus1Multiplier = 1;
    var autoClickCost = 100;
    var clickPlus1Cost = 500;
    var coins = 0;

    var hasReachedButtonOne = false;

    function updateButton() {
        if (coins >= autoClickCost) {
            autoClickButton.removeAttribute('disabled');
        } else {
            autoClickButton.setAttribute('disabled', 'disabled');
        }

        if ( score>=100 || hasReachedButtonOne) {
            clickPlus1Button.classList.remove('hidden');
        } else {
            clickPlus1Button.classList.add('hidden');
        }
    }

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
        scoreDisplay.classList.add("trembling-animation");
        setTimeout(() => {
            scoreDisplay.classList.remove("trembling-animation");
        }, 500);

        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        autoClickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
        coinsDisplay.textContent = 'Pièces: ' + coins;
        updateButton();
    }

    function updateCoins() {
        coinsDisplay.textContent = 'Pièces: ' + coins;
        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        autoClickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
        coinsDisplay.textContent = 'Pièces: ' + coins;
        updateButton();
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
            autoClicks += 5;
            coins -= autoClickCost;
            autoClickCost += 50;
            updateScore();

            if (autoClicks === 5) {
                setInterval(function () {
                    incrementScore(autoClicks);
                }, 1000);
                setInterval(function () {
                    incrementCoins(autoClicks);

                }, 1000);
            }
        }
    }

    function toggleClickPlus1() {
        if (coins >= clickPlus1Cost) {
            coins -= clickPlus1Cost;
            clickPlus1Cost += 500;
            clickPlus1Multiplier++;
            updateScore();

            hasReachedButtonOne = true;
        }
    }

    clickButton.addEventListener('click', function () {
        incrementScore(clickPlus1Multiplier);
        coins += clickPlus1Multiplier; // Ajout de pièces pour chaque clic
    });

    autoClickButton.addEventListener('click', function () {
        toggleAutoClick();
    });

    clickPlus1Button.addEventListener('click', function () {
        toggleClickPlus1();
    });

    updateButton();
});
