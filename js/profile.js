import {updateNavbar} from "./navbar.js";

const account = JSON.parse(sessionStorage.getItem("account"));

const randomizeProfileButton = document.getElementById("randomizeProfileButton");
const profileImageElement = document.getElementById("imageDeProfil");

window.addEventListener("load", function() {
    updateProfileImageBackground();
});

randomizeProfileButton.addEventListener("click", function() {
    let imageUrl = generateRandomProfileImage();
    updateSessionImage(imageUrl);
    updateNavbar();
    updateProfileImageBackground();
});


function generateRandomProfileImage() {
    const randomImageIndex = Math.floor(Math.random() * 5) + 1; // Génère un nombre aléatoire entre 1 et 5
    return `image${randomImageIndex}.jpg`;
}

function updateProfileImageBackground() {
    profileImageElement.style.backgroundImage = `url('../asset/imagesProfil/${account.image}')`;
}

function updateSessionImage(image) {
    account.image = image;
    sessionStorage.setItem("account", JSON.stringify(account));
}

