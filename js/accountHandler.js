import { createAccount, clearAccounts } from "./accountInitialiser.js";

const accounts = JSON.parse(localStorage.getItem("accounts"));

// S'il y a aucun compte dans le local storage, on initialise avec le compte admin
if (accounts === null || accounts === []) {
    clearAccounts();
}


document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (window.location.pathname === "/AB_AW_G10/account/sign-up.html") registerAccount();
    else if (window.location.pathname === "/AB_AW_G10/account/log-in.html") loginAccount();
    else if (window.location.pathname === "/AB_AW_G10/account/password.html") changePassword();
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
        /*
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let index = accounts.findIndex(acc => acc.username === account.username);
        accounts[index] = account;
        setAccounts(accounts);
        */
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