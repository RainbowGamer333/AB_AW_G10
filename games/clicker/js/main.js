import AchievementUtils from "../../../js/AchievementUtils.js";
import {ScoreboardClicker} from "../../../js/Scoreboard.js";
//import {initialiserScoresClicker} from "../../../js/localStorageInitialiser/scoreInitialiser.js";

document.addEventListener('DOMContentLoaded', function () {
     let clickButton = document.getElementById('clickButton');
     let autoClickButton = document.getElementById('autoClickButton');
     let clickPlus1Button = document.getElementById('clickPlus1');
     let scoreDisplay = document.getElementById('score');
     let autoClickCostDisplay = document.getElementById('autoClickCostDisplay');
     let clickPlus1CostDisplay = document.getElementById('clickPlus1CostDisplay');
     let coinsDisplay = document.getElementById('coinsDisplay');
     let cpsDisplay = document.getElementById('cpsDisplay');
     let nextClickValueDisplay = document.getElementById('nextClickValueDisplay'); // Ajout de l'affichage de la prochaine valeur de clic
     let megaAutoClickButton = document.getElementById('megaAutoClickButton');
     let megaAutoClickCostDisplay = document.getElementById('megaAutoClickCostDisplay');
     let clickPlus1000Button = document.getElementById('clickPlus1000Button');
     let clickPlus1000CostDisplay = document.getElementById('clickPlus1000CostDisplay');
     let timerDisplay = document.getElementById('timerDisplay'); // Ajout de la référence au chronomètre
     let startTime;
     let timerInterval;
     let score = 0;
     let autoClicks = 0;
     let clickPlus1Multiplier = 1;
     let autoClickCost = 1500;
     let clickPlus1Cost = 500;
     let megaAutoClickCost = 50000;
     let clickPlus1000Cost = 10000;
     let coins = 0;
     let cps = 0;
     let nextClickValue = clickPlus1Multiplier; // Initialisation de la prochaine valeur de clic
     let hasReachedButtonOne = false;
     let hasReachedButtonTwo = false;


    const account = JSON.parse(sessionStorage.getItem("account"));
    if (account === null) window.location.href = "/AB_AW_G10/account/log-in.html";

    AchievementUtils.init("clicker");
    ////////////////timer//////////////////////////
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
    function stopTimer() {
        clearInterval(timerInterval);
    }
    function updateTimer() {
         let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        displayTime(elapsedTime); // Mettre à jour l'affichage du chronomètre
    }
    function displayTime(time) {
         let seconds = time % 60;
         let minutes = Math.floor(time / 60) % 60;
         let hours = Math.floor(time / 3600);
        timerDisplay.textContent = 'Temps écoulé: ' + hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }

    ////////mettre à jour les boutons sous le clicker///////
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
            AchievementUtils.increaseCounterAndTryUnlock(1, 1);
        } else {
            autoClickButton.classList.add('hidden');
        }

        if (score >= 200000) {
            clickPlus1000Button.classList.remove('hidden');
            clickPlus1000CostDisplay.classList.remove('hidden');
        }else {
            clickPlus1000Button.classList.add('hidden');
        }

        if (score >= 500000) {
            megaAutoClickButton.classList.remove('hidden');
            megaAutoClickCostDisplay.classList.remove('hidden');
            autoClickButton.classList.add('hidden');
            autoClickCostDisplay.classList.add('hidden');
            AchievementUtils.increaseCounterAndTryUnlock(6, 1);
        } else {
            megaAutoClickButton.classList.add('hidden');
        }

    }
////////bouton qui incrémente les scores//////
    clickButton.addEventListener('click', function () {
        // Utilise la prochaine valeur de clic pour incrémenter le score
        incrementScore(nextClickValue);
        // Utilise la prochaine valeur de clic pour incrémenter les pièces
        incrementCoins(nextClickValue);
        cps++;
        playClickAnimation(nextClickValue);
        playClick1000Animation(nextClickValue);

    })

    /////////affichage du score//////
    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
        scoreDisplay.classList.add("trembling-animation");
        setTimeout(() => {
            scoreDisplay.classList.remove("trembling-animation");
        }, 500);

        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        clickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
        clickPlus1000CostDisplay.textContent = 'Prochain achat de clic +1000: ' + clickPlus1000Cost;
        megaAutoClickCostDisplay.textContent = 'Prochain achat Mega Autoclic: ' + megaAutoClickCost;

        updateCoins();
        updateButton();

        // Vérifiez si le score atteint le seuil pour chaque image et faites disparaître les rectangles correspondants
        if (score >= 2000) {
            let rectangle = document.querySelector('#imageOne .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image2000');
            h4Element.classList.add('decompose-animation');
            AchievementUtils.increaseCounterAndTryUnlock(0, 1);

        }
        if (score >= 5000) {
             let rectangle = document.querySelector('#imageTwo .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image5000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 25000) {
             let rectangle = document.querySelector('#imageThree .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image25000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 50000) {
             let rectangle = document.querySelector('#imageFour .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image50000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 100000) {
             let rectangle = document.querySelector('#imageFive .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image100000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 250000) {
             let rectangle = document.querySelector('#imageSix .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image250000');
            h4Element.classList.add('decompose-animation');
            AchievementUtils.increaseCounterAndTryUnlock(2, 1);
        }
        if (score >= 500000) {
             let rectangle = document.querySelector('#imageSeven .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image500000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 1000000) {
             let rectangle = document.querySelector('#imageEight .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image1000000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 5000000) {
             let rectangle = document.querySelector('#imageNine .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image5000000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 100000000) {
             let rectangle = document.querySelector('#imageTen .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image100000000');
            h4Element.classList.add('decompose-animation');
            AchievementUtils.increaseCounterAndTryUnlock(3, 1);
        }
        if (score >= 500000000) {
             let rectangle = document.querySelector('#imageEleven .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image500000000');
            h4Element.classList.add('decompose-animation');
        }
        if (score >= 1000000000) {
             let rectangle = document.querySelector('#imageTwelve .rectangle');
            rectangle.classList.add('decompose-animation');
            setTimeout(() => {
                rectangle.style.display = 'none'; //  cache le rectangle après l'animation
                h4Element.style.display = 'none';
            }, 3000); //  durée de l'animation CSS
            let h4Element = document.getElementById('image1000000000');
            h4Element.classList.add('decompose-animation');
            AchievementUtils.increaseCounterAndTryUnlock(5, 1);
        }

        if (score >= 1 && !startTime) {
            startTimer();
        } else if (score >= 1100000000 && startTime) {
            stopTimer();
        }
    }

    function updateCoins() {
        coinsDisplay.textContent = 'Pièces: ' + coins;
        autoClickCostDisplay.textContent = 'Prochain achat d\'autoclic: ' + autoClickCost;
        clickPlus1CostDisplay.textContent = 'Prochain achat de clic +1: ' + clickPlus1Cost;
        megaAutoClickCostDisplay.textContent = 'Prochain achat Mega Autoclic: ' + megaAutoClickCost;
        clickPlus1000CostDisplay.textContent = 'Prochain achat de clic +1000: ' + clickPlus1000Cost;
    }

    function incrementScore(amount) {
        if (score < 1100000000) {
            score += amount;
            updateScore();
            checkEndGame();
        }


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
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playAutoClickAnimation(autoClicks);
                    }
                }, 1500);
            }

            if (autoClicks >= 5) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playAutoClickAnimation(autoClicks);
                    }
                }, 1200);
            }

            if (autoClicks >= 10) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playAutoClickAnimation(autoClicks);
                    }
                }, 1000);
            }

            if (autoClicks >= 15) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playAutoClickAnimation(autoClicks);
                    }
                }, 800);
            }

            hasReachedButtonTwo = true;
        }
    }

    function toggleMegaAutoClick() {
        if (coins >= megaAutoClickCost) {
            autoClicks += 1000;
            coins -= megaAutoClickCost;
            megaAutoClickCost += 500000;
            updateScore();

            if (autoClicks >= 1000) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playMegaAutoClickAnimation(autoClicks);
                    }

                }, 2000);
            }
            if (autoClicks >= 5000) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playMegaAutoClickAnimation(autoClicks);
                    }
                }, 1500);
            }

            if (autoClicks >= 10000) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playMegaAutoClickAnimation(autoClicks);
                    }
                }, 1200);
            }

            if (autoClicks >= 15000) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playMegaAutoClickAnimation(autoClicks);
                    }
                }, 1000);
            }

            if (autoClicks >= 20000) {
                setInterval(function () {
                    incrementScore(autoClicks);
                    incrementCoins(autoClicks);
                    if (score <=1100000000){
                        // Appel de la fonction pour l'animation du clic automatique avec la valeur appropriée
                        playMegaAutoClickAnimation(autoClicks);
                    }
                }, 800);

            }


            hasReachedButtonTwo = true;
        }
    }
    function toggleClickPlus1() {
        if (coins >= clickPlus1Cost) {
            coins -= clickPlus1Cost;
            nextClickValue += 1; // Augmente la valeur pour le prochain achat
            clickPlus1Cost += 500; // Augmente le coût pour le prochain achat
            updateScore(); // Mettre à jour l'affichage du score, y compris nextClickValueDisplay
            hasReachedButtonOne = true;
            playClickAnimation(nextClickValue); // Utiliser nextClickValue au lieu de amount
        }
    }



    function toggleClickPlus1000() {
        if (coins >= clickPlus1000Cost) {
            coins -= clickPlus1000Cost;
            nextClickValue += 1000; // Ajoute 1000 au multiplicateur actuel
            clickPlus1000Cost += 10000;
            updateScore();
            playClick1000Animation(amount);
        }
    }


    setInterval(function () {
        nextClickValueDisplay.textContent = 'Ajout de : ' + nextClickValue;
    }, 10);

// Ajoutez un écouteur d'événements au bouton MegaAutoClick
    megaAutoClickButton.addEventListener('click', function () {
        toggleMegaAutoClick();
    });


// Ajoutez un écouteur d'événements au bouton ClicPlus1000
    clickPlus1000Button.addEventListener('click', function () {
        toggleClickPlus1000();
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

    function playMegaAutoClickAnimation(amount) {
        const animationContainer = document.getElementById('animationContainer');
        const autoClick = document.createElement('div');
        autoClick.textContent = '+' + amount;
        autoClick.classList.add('mega-auto-click-animation'); // Classe CSS pour la couleur de l'animation automatique
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

    function playClick1000Animation(amount) {
        const animationContainer = document.getElementById('animationContainer');
        const autoClick = document.createElement('div');
        autoClick.textContent = '+' + amount;
        autoClick.classList.add('click-1000-animation'); // Classe CSS pour la couleur de l'animation automatique
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

    // cheat code ^^
    document.addEventListener('keydown', function(event) {
        // Vérification de la séquence de touche pour le cheat
        if (event.key === 'b' && event.ctrlKey) {
            // Ajout de 1000 de score et de pièces
            incrementScore(100000000);
            incrementCoins(100000000);
            // Mise à jour de l'affichage
            updateScore();
            AchievementUtils.increaseCounterAndTryUnlock(4, 1);
        }
    });

//////////////////////////////image//////////////////////////
    // Fonction pour générer une couleur aléatoire au format hexadecimal
    function getRandomColor() {
         let letters = '0123456789ABCDEF';
         let color = '#';
        for ( let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

// Ajoutez un gestionnaire d'événements à l'image
    document.getElementById('imageOne').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('leftPanel').style.backgroundColor = randomColor;
    });

    document.getElementById('imageTwo').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('title').style.color = randomColor;
    });

    document.getElementById('imageThree').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('timerDisplay').style.color = randomColor;
    });

    document.getElementById('imageFour').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('score').style.color = randomColor;
    });

    document.getElementById('imageFive').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('coinsDisplay').style.color = randomColor;
    });

    document.getElementById('imageSix').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('cpsDisplay').style.color = randomColor;
    });

    document.getElementById('imageSeven').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('nextClickValueDisplay').style.color = randomColor;
    });

    document.getElementById('imageEight').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('valueGame').style.backgroundColor = randomColor;
    });

    document.getElementById('imageNine').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('rightPanel').style.backgroundColor = randomColor;
    });

    document.getElementById('imageTen').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('zoneClicker').style.color = randomColor;
    });

    document.getElementById('imageEleven').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('').style.backgroundColor = randomColor;
    });

    document.getElementById('imageTwelve').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('').style.color = randomColor;
    });

    document.getElementById('clickButton').addEventListener('click', function () {
        // Génère une couleur aléatoire
         let randomColor = getRandomColor();
        // Applique la couleur aléatoire à la div leftPanel
        document.getElementById('clickButton').style.backgroundColor = randomColor;
    });

    function checkEndGame() {
        if (score >= 1100000000) {
            endGame(); // Appel à endGame() lorsque le score atteint 1 milliard


        }
    }

    function endGame() {
        // Supprimer tous les éléments du jeu
         let gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = '';

        const endTime = new Date();

        let elapsedTime = endTime - startTime; // Calcule le temps écoulé en millisecondes
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        let timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        let elapsedTimeInSeconds = (endTime - startTime) / 1000; // Calcule le temps écoulé en secondes
        let timeStringSecond = elapsedTimeInSeconds.toString();

        // Créer un conteneur pour le texte de félicitations et le bouton
        let endGameContainer = document.createElement('div');
        endGameContainer.style.textAlign = 'center';
        endGameContainer.style.display = 'flex';
        endGameContainer.style.flexDirection = 'column';
        endGameContainer.style.alignItems = 'center';
        endGameContainer.style.height= '800px';

        AchievementUtils.increaseCounterAndTryUnlock(7, 1);

        // Créer un élément de texte pour afficher le message de félicitations
         let congratulationsText = document.createElement('div');
        congratulationsText.textContent = 'Félicitations ! Vous avez terminé le jeu en ' + timeString + '. Merci beaucoup d\'avoir joué ! Ne Cliquez SURTOUT PAS sur le BOUTON';

        congratulationsText.style.fontSize = '30px';
        congratulationsText.style.fontWeight = 'bold';
        congratulationsText.style.backgroundColor = 'black';
        congratulationsText.style.color = getRandomColor();
        congratulationsText.style.marginTop= '30%';

        // Créer un bouton pour mettre une image en fond de gameContainer
         let imageButton = document.createElement('button');
        imageButton.textContent = 'Ne pas appuyer dessus !!!!!!!!!';
        imageButton.style.marginTop = '20px'; // Modifier la marge supérieure selon vos besoins
        imageButton.style.backgroundColor= 'lightblue';
        imageButton.style.width='200px';
        imageButton.addEventListener('click', function() {
            imageButton.addEventListener('click', function() {
                 let images = [
                    'Alexis.jpg',
                    'buffaa.gif',
                    'Elyan.jpg',
                    'florian.jpg',
                    'laure.jpg',
                    'logann.jpg',
                    'Michel-Buffa.png',
                    'Quere.jpg',
                    'Romain.jpg',
                    'sachaH.jpg',
                    'samy.jpg',
                    'theoS.jpg',
                    'titouan.jpg',
                ];
                 let randomIndex = Math.floor(Math.random() * images.length);
                 let randomImage = images[randomIndex];
                gameContainer.style.backgroundImage = 'url("images/' + randomImage + '")';
                gameContainer.style.backgroundRepeat = 'space';
                congratulationsText.style.color = getRandomColor();
            });
        });

        // Ajouter un effet de survol sur le bouton
        imageButton.addEventListener('mouseover', function() {
            imageButton.style.backgroundColor = 'lightgreen';
        });

// Retirer l'effet de survol lorsque la souris quitte le bouton
        imageButton.addEventListener('mouseout', function() {
            imageButton.style.backgroundColor = 'lightblue';
        });

        // Ajouter le texte de félicitations et le bouton au conteneur
        endGameContainer.appendChild(congratulationsText);
        endGameContainer.appendChild(imageButton);

        // Ajouter le conteneur à gameContainer
        gameContainer.appendChild(endGameContainer);

        console.log("username : " + account.username);
        console.log("score : " + timeStringSecond);
        ScoreboardClicker.updateScore(account.username, timeStringSecond);
    }

});
