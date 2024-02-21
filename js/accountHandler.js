import { accounts } from "./accounts.js";

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
});


function login() {
    console.log("login");
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;


    let account = accounts.find(account => account.username === username);
    if (account === undefined) alertLogin("Invalid username or password");
    else if (account.password !== password) alertLogin("Invalid username or password");

    else {
        //TODO: save account in local storage
        window.location.href = "../index.html";
    }
}

function alertLogin(message) {
    document.getElementById("alert").innerText = message;
}