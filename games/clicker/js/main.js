document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var clickPlus1Button = document.getElementById('clickPlus1');
    var scoreDisplay = document.getElementById('score');
    var autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
    var autoClickPlus1CostDisplay = document.getElementById('autoClickPlus1CostDisplay');

    var coins = 0;
    var score = 0;
    var autoClicks = 0;
    var clickPlus1Multiplier = 1; // Nouvelle variable pour le multiplicateur du bonus Clic +1
    var autoClickCost = 100;
    var clickPlus1Cost = 500;

    var hasReachedButtonOne = false;

    function updateButton() {
        // Affiche/masque le bouton clicPlus1 en fonction du score
        console.log('score:', score);
        if (score >= 100 || hasReachedButtonOne) {
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
        updateButton();
    }



    function toggleAutoClick() {
        if (score >= autoClickCost) {
            autoClicks += 5;
            score -= autoClickCost;
            autoClickCost += 50;
            updateScore();

            if (autoClicks === 5) {
                setInterval(function () {
                    score += autoClicks;
                    updateScore();
                }, 1000);
            }
        }
    }

    function toggleClickPlus1() {
        if (score >= clickPlus1Cost) {
            score -= clickPlus1Cost;
            clickPlus1Cost += 500;
            clickPlus1Multiplier++; // Augmente le multiplicateur du bonus Clic +1
            updateScore();

            // Marquer le palier des 100 comme atteint une fois que le bouton a été acheté
            hasReachedButtonOne = true;
            console.log('hasReachedButtonOne:', hasReachedButtonOne);
        }
    }


    clickButton.addEventListener('click', function () {
        score += clickPlus1Multiplier; // Score augmente de +2 lorsqu'il y a un clic +1 actif
        updateScore();
    });

    autoClickButton.addEventListener('click', function () {
        toggleAutoClick();
    });

    clickPlus1Button.addEventListener('click', function () {
        toggleClickPlus1();
    });

    updateButton();

});
