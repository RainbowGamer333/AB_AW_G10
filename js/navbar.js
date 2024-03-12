
export function updateNavbar() {
    if (sessionActive()) {
        displayDeconnexion();
        updateProfileImageNavbar();
    } else {
        displayConnexion();
        defaultProfileImageNavbar();
    }

    let account = document.getElementById("account");
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

    deconnexion.removeEventListener("click", deconnecter);
}

function displayDeconnexion() {
    let connexion = document.getElementById("connexion");
    let deconnexion = document.getElementById("deconnexion");

    connexion.style.display = "none";
    deconnexion.style.display = "flex";

    deconnexion.addEventListener("click", deconnecter);
}

function updateLocalStorage(account, callback) {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let index = accounts.findIndex(acc => acc.username === account.username);
    accounts[index] = account;
    localStorage.setItem("accounts", JSON.stringify(accounts));
    callback();
}

function deconnecter() {
    updateLocalStorage(JSON.parse(sessionStorage.getItem("account")), () => {
        sessionStorage.removeItem("account");
        window.location.href = "/AB_AW_G10/index.html";
    });
}

function sessionActive() {
    return JSON.parse(sessionStorage.getItem("account"));
}
