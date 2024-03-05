// Fonction pour mettre à jour l'image de profil dans la barre de navigation

document.addEventListener("DOMContentLoaded", function () {
    console.log("navbar loaded");
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


//updateProfileImageNavbar();
