import { createAccount, clearAccounts } from "./localStorageInitialiser/accountInitialiser.js";

const accounts = JSON.parse(localStorage.getItem("accounts"));

window.addEventListener("DOMContentLoaded", () => {
    if (accounts === null || accounts === []) {
        clearAccounts();
    }

    const eyes = document.querySelectorAll(".eye");
    eyes.forEach(eye => {
        eye.addEventListener("click", (e) => {
            e.preventDefault();
            let passwordField = eye.previousElementSibling;

            if (passwordField.type === "password") {
                passwordField.type = "text";
                eye.src = "../asset/icons/view.png";
            }
            else if (passwordField.type === "text") {
                passwordField.type = "password";
                eye.src = "../asset/icons/view_closed.png";
            }
        });
    });

    let accountForm = document.querySelector("#form");
    if (accountForm) accountForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (window.location.pathname === "/AB_AW_G10/account/sign-up.html") registerAccount();
        else if (window.location.pathname === "/AB_AW_G10/account/log-in.html") loginAccount();
        else if (window.location.pathname === "/AB_AW_G10/account/password.html") changePassword();
    });
});


function loginAccount() {
    let username = document.querySelector("#usernameLogin").value;
    let password = document.querySelector("#passwordLogin").value;

    let account = accounts.find(account => account.username === username);

    if (account === undefined) alertLogin("Invalid username or password");
    else if (account.password !== password) alertLogin("Invalid username or password");
    else {
        loginSession(account);
        window.location.href = "../index.html";
    }
}


function registerAccount() {
    let username = document.querySelector("#usernameRegister");
    let password = document.querySelector("#passwordRegister");
    let passwordConfirm = document.querySelector("#passwordRegisterConfirm");
    let mail = document.querySelector("#emailRegister");

    let account = accounts.find(account => account.username === username.value)
    let email = accounts.find(account => account.mail === mail.value);

    if (password.value !== passwordConfirm.value) {
        alertLogin("Passwords do not match");
        password.value = "";
        passwordConfirm.value = "";
    }
    else if (account !== undefined || email !== undefined) alertLogin("Username or email already exists");
    else {
        registerNewAccount(username.value, password.value, mail.value, accounts, (message) => {
            if (message !== undefined) alertLogin(message);
            else window.location.href = "log-in.html";
        });
    }
}


function changePassword() {
    let oldPassword = document.querySelector("#oldPassword");
    let newPassword = document.querySelector("#newPassword");
    let newPasswordConfirm = document.querySelector("#newPasswordConfirm");

    let account = JSON.parse(sessionStorage.getItem("account"));
    if (account.password !== oldPassword.value) alertLogin("Old password invalid");
    else if (newPassword.value !== newPasswordConfirm.value) {
        alertLogin("Passwords do not match");
        newPassword.value = "";
        newPasswordConfirm.value = "";
    }
    else {
        account.password = newPassword.value;
        sessionStorage.setItem("account", JSON.stringify(account));
        window.location.href = "../account/account.html";
    }
}

function setAccounts(accounts) {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

function registerNewAccount(username, password, email, accounts, callback) {
    let account = createAccount(username, password, email);
    accounts.push(account);
    setAccounts(accounts);
    callback();
}

function loginSession(account) {
    sessionStorage.setItem("account", JSON.stringify(account));
}


function alertLogin(message) {
    document.getElementById("alert").innerText = message;
}

function updateLocalStorage(account, callback) {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let index = accounts.findIndex(acc => acc.username === account.username);
    accounts[index] = account;
    localStorage.setItem("accounts", JSON.stringify(accounts));
    callback();
}

export function deconnecterCompte() {
    updateLocalStorage(JSON.parse(sessionStorage.getItem("account")), () => {
        sessionStorage.removeItem("account");
        window.location.href = "/AB_AW_G10/index.html";
    });
}

export function supprimerCompte() {
    let account = JSON.parse(sessionStorage.getItem("account"));
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let index = accounts.findIndex(acc => acc.username === account.username);
    accounts.splice(index, 1);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    sessionStorage.removeItem("account");
    window.location.href = "/AB_AW_G10/index.html";
}