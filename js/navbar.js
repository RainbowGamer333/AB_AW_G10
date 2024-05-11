import {deconnecterCompte} from "./accountHandler.js";

export function updateNavbar() {
    if (sessionActive()) {
        displayDeconnexion();
        updateProfileImageNavbar();
    } else {
        displayConnexion();
        defaultProfileImageNavbar();
    }

    displayUsername();

    let account = document.querySelector(".account-container");
    account.addEventListener("click", function () {
        if (sessionActive()) {
            window.location.href = "/AB_AW_G10/account/account.html";
        } else {
            window.location.href = "/AB_AW_G10/account/log-in.html";
        }
    });

}

function updateProfileImageNavbar() {
    let storedAccount = JSON.parse(sessionStorage.getItem("account"));
    let account = document.getElementById("account");

    let link = "";
    if (storedAccount) link = "/AB_AW_G10/asset/imagesProfil/" + storedAccount.image;
    else link = "/AB_AW_G10/asset/icons/user.png";

    account.style.backgroundImage = "url('" + link + "')";
}

function defaultProfileImageNavbar() {
    let account = document.getElementById("account");
    account.style.backgroundImage = "url('/AB_AW_G10/asset/icons/user.png')";
}

function displayConnexion() {
    let connexion = document.getElementById("connexion");
    let deconnexion = document.getElementById("deconnexion");

    connexion.style.display = "flex";
    deconnexion.style.display = "none";

    deconnexion.removeEventListener("click", deconnecterCompte);
}

function displayDeconnexion() {
    let connexion = document.getElementById("connexion");
    let deconnexion = document.getElementById("deconnexion");

    connexion.style.display = "none";
    deconnexion.style.display = "flex";

    deconnexion.addEventListener("click", deconnecterCompte);
}

function displayUsername() {
    let account = JSON.parse(sessionStorage.getItem("account"));
    let username = document.getElementById("username");
    if (account) username.innerHTML = account.username;
}





function sessionActive() {
    return JSON.parse(sessionStorage.getItem("account"));
}
