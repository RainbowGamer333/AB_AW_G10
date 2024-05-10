import {updateNavbar} from "./navbar.js";

const account = JSON.parse(sessionStorage.getItem("account"));

const randomizeProfileButton = document.getElementById("randomizeProfileButton");
const profileImageElement = document.getElementById("imageDeProfil");
const changerPasswordButton = document.getElementById("changerPasswordButton");

console.log(account);

window.addEventListener("load", function() {
    updateProfileImageBackground();
    updateProfileInformationTable();
    updateAchievements()
});

randomizeProfileButton.addEventListener("click", function() {
    let imageUrl = generateRandomProfileImage();
    updateSessionImage(imageUrl);
    updateNavbar();
    updateProfileImageBackground();
});

changerPasswordButton.addEventListener("click", function() {
    console.log("click");
    window.location.href = "password.html";
});


function generateRandomProfileImage() {
    const randomImageIndex = Math.floor(Math.random() * 13) + 1; // Génère un nombre aléatoire entre 1 et 5
    return `image${randomImageIndex}.jpg`;
}

function updateProfileImageBackground() {
    profileImageElement.style.backgroundImage = `url('../asset/imagesProfil/${account.image}')`;
}

function updateSessionImage(image) {
    account.image = image;
    sessionStorage.setItem("account", JSON.stringify(account));
}

function updateProfileInformationTable() {
    let pseudo = document.getElementById("pseudo");
    let email = document.getElementById("email");

    // Get 2nd <td> element from pseudo
    pseudo.children[1].innerHTML = account.username;
    email.children[1].innerHTML = account.mail;
}


const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const btnDrop = dropdown.querySelector('.bloc-top');
    let toggleIndex = 0;

    btnDrop.addEventListener('click', () => {
        if (toggleIndex === 0) {
            dropdown.style.height = `${dropdown.scrollHeight}px`;
            toggleIndex++;
        } else {
            dropdown.style.height = `${btnDrop.scrollHeight}px`;
            toggleIndex--;
        }
    });
});


function updateAchievements() {
    let trophes = document.querySelector(".trophes");
    for (let achievementBox of trophes.children) {
        let ul = document.querySelectorAll(".achievements_list");

        switch (achievementBox.id) {
            case "demineur":
                createAchievementsList(account.demineur.achievements, ul[0]);
                break;
            case "clicker":
                createAchievementsList(account.clicker.achievements, ul[1]);
                break;
            case "towerDefense":
                createAchievementsList(account.towerDefense.achievements, ul[2]);
                break;
        }
    }
}

function createAchievementsList(userAchievementsList, ul) {
    for (let achievement of userAchievementsList) {
        let li = document.createElement("li");
        li.classList.add("achievement_element");

        let img = document.createElement("img");
        img.src = achievement.imageURL;
        img.alt = "achievement";

        let p = document.createElement("p");
        p.innerHTML = achievement.name;

        let span = document.createElement("span");
        span.innerHTML = `${Math.min(achievement.valueCurrent, achievement.valueNeed)}/${achievement.valueNeed}`;

        li.appendChild(img);
        li.appendChild(p);
        li.appendChild(span);

        ul.appendChild(li);
    }
    return ul;
}