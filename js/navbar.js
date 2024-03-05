export function updateNavbar() {
    if (sessionActive()) {
        console.log("session active");
        updateProfileImageNavbar();
    } else {
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

function sessionActive() {
    return JSON.parse(sessionStorage.getItem("account"));
}
