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

// Fonction pour mettre à jour l'image de profil dans la barre de navigation
function updateProfileImageInNavbar(imageUrl) {
    const profileImageElement = document.getElementById("account");
    if (profileImageElement) {
        profileImageElement.style.backgroundImage = `url('${imageUrl}')`;
    } else {
        console.log("Element with id 'account' not found.");
    }
}

// Gestionnaire d'événements pour le bouton de génération aléatoire d'image de profil
const randomizeProfileButton = document.getElementById("randomizeProfileButton");
if (randomizeProfileButton) {
    randomizeProfileButton.addEventListener("click", function() {
        const randomImageIndex = Math.floor(Math.random() * 5) + 1; // Génère un nombre aléatoire entre 1 et 6
        const randomImageUrl = `../asset/imagesProfil/image${randomImageIndex}.png`; // Remplacez ceci par le chemin réel de votre pool d'images
        updateProfileImageInNavbar(randomImageUrl);
    });
}

// Récupérer l'URL de l'image affichée sur la page de profil
const imageDeProfilElement = document.getElementById("imageDeProfil");
if (imageDeProfilElement) {
    const imageUrl = imageDeProfilElement.src;
    // Mettre à jour l'image dans la barre de navigation
    updateProfileImageInNavbar(imageUrl);
} else {
    console.log("Element with id 'imageDeProfil' not found.");
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

