import { createAccount } from "./accounts.js";

console.log("Début de fichier");
console.log(getAccounts());

document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (window.location.pathname === "/AB_AW_G10/account/sign-up.html") registerAccount();
    else if (window.location.pathname === "/AB_AW_G10/account/log-in.html") loginAccount();
});

function loginAccount() {
    let username = document.querySelector("#usernameLogin").value;
    let password = document.querySelector("#passwordLogin").value;
    console.log(getAccounts());

    let account = getUsername(username);

    if (account === undefined) alertLogin("Invalid username or password");
    else if (account.password !== password) alertLogin("Invalid username or password");

    else {
        //TODO: save account in session storage
        window.location.href = "../index.html";
    }
}


function registerAccount() {
    let username = document.querySelector("#usernameRegister");
    let password = document.querySelector("#passwordRegister");
    let passwordConfirm = document.querySelector("#passwordRegisterConfirm");
    let mail = document.querySelector("#emailRegister");

    let accounts = getAccounts();

    let account = getUsername(username.value);
    let email = getMail(mail.value);

    if (password.value !== passwordConfirm.value) {
        alertLogin("Passwords do not match");
        password.value = "";
        passwordConfirm.value = "";
    }
    else {
        registerNewAccount(username.value, password.value, mail.value, accounts, (message) => {
            if (message !== undefined) alertLogin(message);
            else window.location.href = "log-in.html";
        });
    }
}


function getAccounts() {
    return JSON.parse(localStorage.getItem("accounts")) || [];
}

function setAccounts(accounts) {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

function getUsername(username) {
    return getAccounts().find(account => account.username === username);
}

function getMail(mail) {
    return getAccounts().find(account => account.mail === mail);
}

function registerNewAccount(username, password, email, accounts, callback) {
    if (username !== undefined || email !== undefined) callback("Username or email already taken");
    let account = createAccount(username, password, email);
    accounts.push(account);
    setAccounts(accounts);
    callback();
}


function alertLogin(message) {
    document.getElementById("alert").innerText = message;
}