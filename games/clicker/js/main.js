document.addEventListener('DOMContentLoaded', function () {
    // Définition des variables globales
    var clickButton = document.getElementById('clickButton');
    var autoClickButton = document.getElementById('autoClickButton');
    var clickPlus1Button = document.getElementById('clickPlus1');
    var scoreDisplay = document.getElementById('score');
    var autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
    var clickPlus1CostDisplay = document.getElementById('clickPlus1CostDisplay');
    var coinsDisplay = document.getElementById('coinsDisplay');
    var cpsDisplay = document.getElementById('cpsDisplay');
    var nextClickValueDisplay = document.getElementById('nextClickValueDisplay');
    var timerDisplay = document.getElementById('timerDisplay');
    var startTime;
    var timerInterval;
    var score = 0;
    var autoClicks = 0;
    var clickPlus1Multiplier = 1;
    var autoClickCost = 1500;
    var clickPlus1Cost = 500;
    var coins = 0;
    var cps = 0;
    var nextClickValue = clickPlus1Multiplier;
    var hasReachedButtonOne = false;
    var hasReachedButtonTwo = false;

    // Initialisation du jeu
    initializeGame();

    // Gestionnaire d'événements pour le bouton de clic
    clickButton.addEventListener('click', handleButtonClick);

    // Gestionnaire d'événements pour le bouton d'achat d'autoclic
    autoClickButton.addEventListener('click', function () {
        handleButtonClick('autoClick');
    });

    // Gestionnaire d'événements pour le bouton d'achat de clic +1
    clickPlus1Button.addEventListener('click', function () {
        handleButtonClick('clickPlus1');
    });

    // Gestionnaire d'événements pour les images
    document.querySelectorAll('.image').forEach(function (image) {
        image.addEventListener('click', handleImageClick);
    });

    // Gestionnaire d'événements pour le cheat code (Ctrl + B)
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'b') {
            cheatCode();
        }
    });

    // Fonction d'initialisation du jeu
    function initializeGame() {
        updateButton();
        updateScore();
    }

    // Fonction de gestion du clic sur le bouton
    function handleButtonClick(action) {
        if (action === 'autoClick' && coins >= autoClickCost) {
            toggleAutoClick();
        } else if (action === 'clickPlus1' && coins >= clickPlus1Cost) {
            toggleClickPlus1();
        } else {
            incrementScore(nextClickValue);
            incrementCoins(nextClickValue);
            cps++;
            nextClickValueDisplay.textContent = 'ajout de :  ' + nextClickValue;
            playClickAnimation(nextClickValue);
        }
    }

    // Fonction de gestion du clic sur les images
    function handleImageClick(event) {
        var elementId = event.target.id;
        var randomColor = getRandomColor();
        switch (elementId) {
            case 'imageOne':
                document.getElementById('leftPanel').style.backgroundColor = randomColor;
                break;
            case 'imageTwo':
                document.getElementById('title').style.color = randomColor;
                break;
            case 'imageThree':
                document.getElementById('timerDisplay').style.color = randomColor;
                break;
            case 'imageFour':
                document.getElementById('score').style.color = randomColor;
                break;
            case 'imageFive':
                document.getElementById('coinsDisplay').style.color = randomColor;
                break;
            case 'imageSix':
                document.getElementById('cpsDisplay').style.color = randomColor;
                break;
            case 'imageSeven':
                document.getElementById('nextClickValueDisplay').style.color = randomColor;
                break;
            case 'imageEight':
                document.getElementById('valueGame').style.backgroundColor = randomColor;
                break;
            case 'imageNine':
                document.getElementById('rightPanel').style.backgroundColor = randomColor;
                break;
            case 'imageTen':
                document.getElementById('zoneClicker').style.color = randomColor;
                break;
            // Ajouter des cas pour les autres images si nécessaire
            default:
                break;
        }
    }

    // Fonction pour incrémenter le score
    function incrementScore(amount) {
        score += amount;
        updateScore();
    }

    // Fonction pour incrémenter les pièces
    function incrementCoins(amount) {
        coins += amount;
        updateCoins();
    }

    // Fonction pour mettre à jour l'affichage du score, des pièces, etc.
    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
        scoreDisplay.classList.add("trembling-animation");
        setTimeout(() => {
            scoreDisplay.classList.remove("trembling-animation");
        }, 500);

        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        clickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
        updateCoins();

        // Logique pour les rectangles et autres mises à jour d'interface
        // ...

        if (score >= 1 && !startTime) {
            startTimer();
        } else if (score >= 1000000000 && startTime) {
            stopTimer();
        }
    }

    // Fonction pour mettre à jour l'affichage des pièces
    function updateCoins() {
        coinsDisplay.textContent = 'Pièces: ' + coins;
        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        clickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
    }

    // Fonction pour démarrer le chronomètre
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Fonction pour arrêter le chronomètre
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Fonction pour mettre à jour le chronomètre
    function updateTimer() {
        var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        var hours = Math.floor(elapsedTime / 3600);
        var minutes = Math.floor((elapsedTime % 3600) / 60);
        var seconds = elapsedTime % 60;
        timerDisplay.textContent = 'Temps écoulé: ' + formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    }

// Fonction pour formater le temps avec deux chiffres (ajoute un zéro devant si nécessaire)
    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }


    // Fonction pour jouer l'animation de clic
    function playClickAnimation(amount) {
        // Logique pour l'animation
    }

    // Fonction pour basculer l'autoclic
    function toggleAutoClick() {
        autoClicks++;
        coins -= autoClickCost;
        autoClickCost *= 2;
        updateButton();
        updateCoins();
        cps++;
        playAutoClickAnimation();
    }

    // Fonction pour basculer le clic +1
    function toggleClickPlus1() {
        clickPlus1Multiplier++;
        coins -= clickPlus1Cost;
        clickPlus1Cost *= 2;
        nextClickValue = clickPlus1Multiplier;
        updateButton();
        updateCoins();
        playClickPlus1Animation();
    }

    // Fonction pour mettre à jour l'état des boutons
    function updateButton() {
        if (coins < autoClickCost) {
            autoClickButton.disabled = true;
        } else {
            autoClickButton.disabled = false;
        }

        if (coins < clickPlus1Cost) {
            clickPlus1Button.disabled = true;
        } else {
            clickPlus1Button.disabled = false;
        }
    }

    // Fonction pour obtenir une couleur aléatoire
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Fonction pour jouer l'animation d'autoclic
    function playAutoClickAnimation() {
        // Logique pour l'animation
    }

    // Fonction pour jouer l'animation de clic +1
    function playClickPlus1Animation() {
        // Logique pour l'animation
    }

    // Cheat code pour gagner 1 million de score et de pièces
    function cheatCode() {
        score += 1000000;
        coins += 1000000;
        updateScore();
        updateCoins();
    }

    // Ajoutez un gestionnaire d'événements à l'image
    document.getElementById('imageOne').addEventListener('click', function () {
        changeColor('leftPanel');
    });

    document.getElementById('imageTwo').addEventListener('click', function () {
        changeColor('title');
    });

    document.getElementById('imageThree').addEventListener('click', function () {
        changeColor('timerDisplay');
    });

    document.getElementById('imageFour').addEventListener('click', function () {
        changeColor('score');
    });

    document.getElementById('imageFive').addEventListener('click', function () {
        changeColor('coinsDisplay');
    });

    document.getElementById('imageSix').addEventListener('click', function () {
        changeColor('cpsDisplay');
    });

    document.getElementById('imageSeven').addEventListener('click', function () {
        changeColor('nextClickValueDisplay');
    });

    document.getElementById('imageEight').addEventListener('click', function () {
        changeBackgroundColor('valueGame');
    });

    document.getElementById('imageNine').addEventListener('click', function () {
        changeBackgroundColor('rightPanel');
    });

    document.getElementById('imageTen').addEventListener('click', function () {
        changeColor('zoneClicker');
    });

    document.getElementById('imageEleven').addEventListener('click', function () {
        // Changer la couleur d'un élément spécifique ici (remplacer '' par l'ID de l'élément)
        changeBackgroundColor('');
    });

    document.getElementById('imageTwelve').addEventListener('click', function () {
        // Changer la couleur d'un élément spécifique ici (remplacer '' par l'ID de l'élément)
        changeColor('');
    });

    document.getElementById('clickButton').addEventListener('click', function () {
        changeBackgroundColor('clickButton');
    });

    // Fonction pour changer la couleur d'un élément spécifique
    function changeColor(elementId) {
        var randomColor = getRandomColor();
        document.getElementById(elementId).style.color = randomColor;
    }

    // Fonction pour changer la couleur de fond d'un élément spécifique
    function changeBackgroundColor(elementId) {
        var randomColor = getRandomColor();
        document.getElementById(elementId).style.backgroundColor = randomColor;
    }

    function checkAndHideRectangle(scoreThreshold, imageId) {
        if (score >= scoreThreshold) {
            var rectangle = document.querySelector('#' + imageId + ' .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; // Cacher le rectangle après l'animation
            }, 3000); // Assurez-vous que cette valeur est supérieure à la durée de l'animation CSS
        }
    }

    setInterval(function () {
        checkAndHideRectangle(1000, 'imageOne');
        checkAndHideRectangle(5000, 'imageTwo');
        checkAndHideRectangle(25000, 'imageThree');
        checkAndHideRectangle(50000, 'imageFour');
        checkAndHideRectangle(100000, 'imageFive');
        checkAndHideRectangle(250000, 'imageSix');
        checkAndHideRectangle(500000, 'imageSeven');
        checkAndHideRectangle(1000000, 'imageEight');
        checkAndHideRectangle(5000000, 'imageNine');
        checkAndHideRectangle(100000000, 'imageTen');
        checkAndHideRectangle(500000000, 'imageEleven');
        checkAndHideRectangle(1000000000, 'imageTwelve');
    }, 1000);
});
