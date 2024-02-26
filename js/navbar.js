// Fonction pour mettre à jour l'image de profil dans la barre de navigation

console.log("navbar.js");

document.addEventListener("DOMContentLoaded", function () {
    let all = document.querySelectorAll("*");
    console.log(all);
    updateProfileImageNavbar();
});

function updateProfileImageNavbar() {
    console.log("updateProfileImageNavbar");
    let storedAccount = sessionStorage.getItem("account");
    let account = document.getElementById("connexion");


    let link = "";
    let img;
    if (storedAccount) {
        console.log("Account stored");
        img = JSON.parse(storedAccount).image;
        link = "asset/imagesProfil/" + img;
    } else {
        link = "asset/icons/user.png";
    }
    account.style.backgroundImage = `url('${link}')`;
}

/*
function checkSession() {
    if (storedAccount) console.log("Session active");
    else console.log("Session inactive");
}
 */

//updateProfileImageNavbar();
