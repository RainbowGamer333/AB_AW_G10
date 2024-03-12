import {updateNavbar} from "./navbar.js";

const account = JSON.parse(sessionStorage.getItem("account"));

const randomizeProfileButton = document.getElementById("randomizeProfileButton");
const profileImageElement = document.getElementById("imageDeProfil");
const changerPasswordButton = document.getElementById("changerPasswordButton");

console.log(account);

window.addEventListener("load", function() {
    updateProfileImageBackground();
    updateProfileInformationTable();
});

randomizeProfileButton.addEventListener("click", function() {
    let imageUrl = generateRandomProfileImage();
    updateSessionImage(imageUrl);
    updateNavbar();
    updateProfileImageBackground();
});

changerPasswordButton.addEventListener("click", function() {
    console.log("click");
    window.location.href = "password.html";
});


function generateRandomProfileImage() {
    const randomImageIndex = Math.floor(Math.random() * 13) + 1; // Génère un nombre aléatoire entre 1 et 5
    return `image${randomImageIndex}.jpg`;
}

function updateProfileImageBackground() {
    profileImageElement.style.backgroundImage = `url('../asset/imagesProfil/${account.image}')`;
}

function updateSessionImage(image) {
    account.image = image;
    sessionStorage.setItem("account", JSON.stringify(account));
}

function updateProfileInformationTable() {
    let pseudo = document.getElementById("pseudo");
    let email = document.getElementById("email");

    // Get 2nd <td> element from pseudo
    pseudo.children[1].innerHTML = account.username;
    email.children[1].innerHTML = account.mail;
}