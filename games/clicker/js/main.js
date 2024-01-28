document.addEventListener('DOMContentLoaded', function () {
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var clicPlus1Button = document.getElementById('clicPlus1');
    var scoreDisplay = document.getElementById('score');
    var autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
    var autoClickPlus1CostDisplay = document.getElementById('autoClickPlus1CostDisplay');

    var score = 0;
    var autoClicks = 0;
    var clicPlus1 = 0;
    var clicPlus1Multiplier = 1; // Nouvelle variable pour le multiplicateur du bonus Clic +1
    var autoClickCost = 100;
    var clicPlus1Cost = 500;

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
        scoreDisplay.classList.add("trembling-animation");
        setTimeout(() => {
            scoreDisplay.classList.remove("trembling-animation");
        }, 500);

        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        autoClickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clicPlus1Cost;
    }

    clickButton.addEventListener('click', function () {
        score += clicPlus1Multiplier; // Score augmente de +2 lorsqu'il y a un clic +1 actif
        updateScore();
    });

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

    autoClickButton.addEventListener('click', function () {
        toggleAutoClick();
    });

    function toggleClicPlus1() {
        if (score >= clicPlus1Cost) {
            score -= clicPlus1Cost;
            clicPlus1Cost += 500;
            clicPlus1Multiplier++; // Augmente le multiplicateur du bonus Clic +1
            updateScore();
        }
    }

    clicPlus1Button.addEventListener('click', function () {
        toggleClicPlus1();
    });
});
