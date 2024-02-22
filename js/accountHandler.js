import { createAccount } from "./accounts.js";

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
console.log(accounts);

document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (window.location.pathname === "/AB_AW_G10/account/sign-up.html") registerAccount();
    else if (window.location.pathname === "/AB_AW_G10/account/log-in.html") loginAccount();
});

function loginAccount() {
    let username = document.querySelector("#usernameLogin").value;
    let password = document.querySelector("#passwordLogin").value;

    let account = accounts.find(account => account.username === username);

    if (account === undefined) alertLogin("Invalid username or password");
    else if (account.password !== password) alertLogin("Invalid username or password");

    else {
        //TODO: save account in local storage
        window.location.href = "../index.html";
    }
}


function registerAccount() {

    let username = document.querySelector("#usernameRegister");
    let password = document.querySelector("#passwordRegister");
    let passwordConfirm = document.querySelector("#passwordRegisterConfirm");
    let mail = document.querySelector("#emailRegister");

    let account = accounts.find(account => account.username === username.value);
    let email = accounts.find(account => account.mail === mail.value);

    if (account !== undefined || email !== undefined) alertLogin("Username or email already taken");
    else if (password.value !== passwordConfirm.value) {
        alertLogin("Passwords do not match");
        password.value = "";
        passwordConfirm.value = "";
    }
    else {
        createAccount(username.value, password.value, mail.value);
        accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        console.log("Fin creation compte");
        console.log(accounts);
        window.location.href = "log-in.html";
    }
}


function alertLogin(message) {
    document.getElementById("alert").innerText = message;
}