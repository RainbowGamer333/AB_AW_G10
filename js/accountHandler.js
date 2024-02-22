import { createAccount, clearAccounts } from "./accountInitialiser.js";

//Pour tester la création et suppression de compte décommenter la ligne suivante
//clearAccounts();
console.log(JSON.parse(localStorage.getItem("accounts")));

document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (window.location.pathname === "/AB_AW_G10/account/sign-up.html") registerAccount();
    else if (window.location.pathname === "/AB_AW_G10/account/log-in.html") loginAccount();
});

function loginAccount() {
    let username = document.querySelector("#usernameLogin").value;
    let password = document.querySelector("#passwordLogin").value;

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
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

    let accounts = JSON.parse(localStorage.getItem("accounts"));

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

function disconnectSession() {
    sessionStorage.removeItem("account");
}


function alertLogin(message) {
    document.getElementById("alert").innerText = message;
}