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
        updateProfileImage();
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
function updateProfileImage() {
    const profileImageElement = document.getElementById("account");
    if (profileImageElement) {
        const randomImageIndex = Math.floor(Math.random() * 6) + 1; // Génère un nombre aléatoire entre 1 et 6
        const randomImageUrl = `asset/imagesProfil/{randomImageIndex}.png`; // Remplacez ceci par le chemin réel de votre pool d'images
        profileImageElement.style.backgroundImage = `url('${randomImageUrl}')`;
    } else {
        console.log("Element with id 'account' not found.");
    }
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

