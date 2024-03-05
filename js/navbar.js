
export function updateNavbar() {
    if (sessionActive()) {
        displayDeconnexion();
        updateProfileImageNavbar();
    } else {
        displayConnexion();
        defaultProfileImageNavbar();
    }
}

function updateProfileImageNavbar() {
    let storedAccount = JSON.parse(sessionStorage.getItem("account"));
    let account = document.getElementById("account");

    let link = "";
    if (storedAccount) link = "../asset/imagesProfil/" + storedAccount.image;
    else link = "../asset/icons/user.png";

    account.style.backgroundImage = "url('" + link + "')";
}

function defaultProfileImageNavbar() {
    let account = document.getElementById("account");
    account.style.backgroundImage = "url('../asset/icons/user.png')";
}

function displayConnexion() {
    let connexion = document.getElementById("connexion");
    let deconnexion = document.getElementById("deconnexion");

    connexion.style.display = "flex";
    deconnexion.style.display = "none";
}

function displayDeconnexion() {
    let connexion = document.getElementById("connexion");
    let deconnexion = document.getElementById("deconnexion");

    connexion.style.display = "none";
    deconnexion.style.display = "flex";

    deconnexion.addEventListener("click", function () {
        updateLocalStorage(JSON.parse(sessionStorage.getItem("account")));
        sessionStorage.removeItem("account");
        window.location.href = "../log-in.html";
    });
}

function updateLocalStorage(account) {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let index = accounts.findIndex(acc => acc.username === account.username);
    accounts[index] = account;
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

function sessionActive() {
    return JSON.parse(sessionStorage.getItem("account"));
}
