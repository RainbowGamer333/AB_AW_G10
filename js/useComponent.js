import {Utils} from "../games/towerDefense/js/utils/Utils.js";
import {Path} from "../games/towerDefense/js/constants/Path.js";


function init(){
    //Create footer
    Utils.readTextFile("/component/footer.html", (text) =>{
        replaceComponent("footer",text);
    });

    //Create navbar
    Utils.readTextFile("/component/navbar.html", (text) =>{
        replaceComponent("nav",text);
    });


}

function replaceComponent(elementTagName, newTagHtml){
    const oldElement = document.getElementsByTagName(elementTagName)[0];
    const newElement = document.createElement(elementTagName);
    newElement.innerHTML = newTagHtml;
    if (oldElement){
        oldElement.replaceWith(newElement)
    }else{
        console.log("Node with the tag "+elementTagName+" not found.")
    }
}

// Fonction pour mettre à jour l'image de profil
function updateProfileImageInNavbar(imageUrl) {
    const profileImageElement = document.querySelector(".profile-image-container");
    if (profileImageElement) {
        profileImageElement.style.backgroundImage = `../asset/imagesProfil/images${randomImageIndex}.png`;
    } else {
        console.log("Element with class 'profile-image-container' not found.");
    }
}

function updateProfileImageOnPage(imageUrl) {
    const profileImageElement = document.getElementById("profileImage"); // Assurez-vous d'attribuer un ID à l'élément qui contiendra l'image de profil sur la page de profil
    if (profileImageElement) {
        profileImageElement.style.backgroundImage = `../asset/imagesProfil/images${randomImageIndex}.png`;
    } else {
        console.log("Element with id 'profileImage' not found.");
    }
}

// Gestionnaire d'événements pour le bouton de génération aléatoire d'image de profil
const randomizeProfileButton = document.getElementById("randomizeProfileButton");
if (randomizeProfileButton) {
    randomizeProfileButton.addEventListener("click", function() {
        const randomImageIndex = Math.floor(Math.random() * 6) + 1; // Génère un nombre aléatoire entre 1 et 6
        const randomImageUrl = `../asset/imagesProfil/images${randomImageIndex}.png`; // Remplacez ceci par le chemin réel de votre pool d'images

        // Mettre à jour l'image de profil dans la barre de navigation
        updateProfileImageInNavbar(randomImageUrl);

        // Mettre à jour l'image de profil sur la page de profil
        updateProfileImageOnPage(randomImageUrl);
    });
}

let velocity = -0.2;
let parallaxElements = document.getElementsByClassName("parallaxBG");
function update(){
    let pos = window.scrollY;
    for (let i = 0; i < parallaxElements.length;i++){
        const element = parallaxElements[i];
        let height = element.style.height-60;
        // let value = Math.round((height - pos) * velocity);
        let value = (height - pos) * velocity;

        element.style.backgroundPositionY = value  +  'px';
        // console.log(value)
    }
}

window.addEventListener('scroll', update);

window.addEventListener('load', function () {
    init();
})

