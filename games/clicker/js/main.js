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

        // Vérifiez si le score atteint le seuil pour chaque image et faites disparaître les rectangles correspondants
        if (score >= 1000) {
            var rectangle = document.querySelector('#imageOne .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 5000) {
            var rectangle = document.querySelector('#imageTwo .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 25000) {
            var rectangle = document.querySelector('#imageThree .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 50000) {
            var rectangle = document.querySelector('#imageFour .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 100000) {
            var rectangle = document.querySelector('#imageFive .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 250000) {
            var rectangle = document.querySelector('#imageSix .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 500000) {
            var rectangle = document.querySelector('#imageSeven .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 1000000) {
            var rectangle = document.querySelector('#imageEight .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 5000000) {
            var rectangle = document.querySelector('#imageNine .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 100000000) {
            var rectangle = document.querySelector('#imageTen .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 500000000) {
            var rectangle = document.querySelector('#imageEleven .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
        if (score >= 1000000000) {
            var rectangle = document.querySelector('#imageTwelve .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }





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
                    // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                    playAutoClickAnimation(autoClicks);
                }, 1500);
            }

            if (autoClicks >= 5) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                    playAutoClickAnimation(autoClicks);
                }, 1200);
            }

            if (autoClicks >= 10) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                    playAutoClickAnimation(autoClicks);
                }, 1000);
            }

            if (autoClicks >= 15) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                    playAutoClickAnimation(autoClicks);
                }, 800);
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
    //fonction pour le bouton
    clickButton.addEventListener('click', function () {
        // Utilise la prochaine valeur de clic pour incrémenter le score
        incrementScore(nextClickValue);
        // Utilise la prochaine valeur de clic pour incrémenter les pièces
        incrementCoins(nextClickValue);
        cps++;
        nextClickValueDisplay.textContent = 'ajout de :  ' + nextClickValue; // Met à jour l'affichage de la prochaine valeur de clic

        // Jouer l'animation en fonction de l'augmentation du score
        playClickAnimation(nextClickValue);
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

    function playClickAnimation(amount) {
        const animationContainer = document.getElementById('animationContainer');
        const plusOne = document.createElement('div');
        plusOne.textContent = '+' + amount;
        plusOne.classList.add('click-animation');
        // Positionnement aléatoire
        const randomX = Math.random() * (window.innerWidth - 100); // Largeur de la fenêtre moins la taille du div d'animation
        const randomY = Math.random() * (window.innerHeight - 100); // Hauteur de la fenêtre moins la taille du div d'animation
        plusOne.style.left = randomX + 'px';
        plusOne.style.top = randomY + 'px';
        animationContainer.appendChild(plusOne);
        setTimeout(() => {
            animationContainer.removeChild(plusOne);
        }, 2000);
    }

    function playAutoClickAnimation(amount) {
        const animationContainer = document.getElementById('animationContainer');
        const autoClick = document.createElement('div');
        autoClick.textContent = '+' + amount;
        autoClick.classList.add('auto-click-animation'); // Classe CSS pour la couleur de l'animation automatique
        // Positionnement aléatoire
        const randomX = Math.random() * (window.innerWidth - 100); // Largeur de la fenêtre moins la taille du div d'animation
        const randomY = Math.random() * (window.innerHeight - 100); // Hauteur de la fenêtre moins la taille du div d'animation
        autoClick.style.left = randomX + 'px';
        autoClick.style.top = randomY + 'px';
        animationContainer.appendChild(autoClick);
        setTimeout(() => {
            animationContainer.removeChild(autoClick);
        }, 2000);
    }


    // Écoute des touches du clavier
    document.addEventListener('keydown', function(event) {
        // Vérification de la séquence de touche pour le cheat
        if (event.key === 'b' && event.ctrlKey) {
            // Ajout de 1000 de score et de pièces
            incrementScore(1000);
            incrementCoins(1000);
            // Mise à jour de l'affichage
            updateScore();
        }
    });

//////////////////////////////image//////////////////////////
    // Fonction pour générer une couleur aléatoire au format hexadecimal
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

// Ajoutez un gestionnaire d'événements à l'image
    document.getElementById('imageOne').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('leftPanel').style.backgroundColor = randomColor;
    });

    document.getElementById('imageTwo').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('title').style.color = randomColor;
    });

    document.getElementById('imageThree').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('coinsDisplay').style.color = randomColor;
    });

    document.getElementById('imageFour').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('clickButton').style.color = randomColor;
    });

    document.getElementById('imageFive').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('score').style.color = randomColor;
    });

    document.getElementById('imageSix').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('cpsDisplay').style.color = randomColor;
    });

    document.getElementById('imageSeven').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('clickPlus1').style.color = randomColor;
    });

    document.getElementById('imageEight').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('autoClickButton').style.color = randomColor;
    });

    document.getElementById('imageNine').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('clickButton').style.backgroundColor = randomColor;
    });

    document.getElementById('imageTen').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('zoneClicker').style.color = randomColor;
    });

    document.getElementById('imageEleven').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('rightPanel').style.backgroundColor = randomColor;
    });

    document.getElementById('imageTwelve').addEventListener('click', function () {
        // Génère une couleur aléatoire
        var randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('nextClickValueDisplay').style.color = randomColor;
    });

});
