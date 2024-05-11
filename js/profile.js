import {updateNavbar} from "./navbar.js";
import {deconnecterCompte, supprimerCompte} from "./accountHandler.js";

const account = JSON.parse(sessionStorage.getItem("account"));

const randomizeProfileButton = document.getElementById("randomizeProfileButton");
const profileImageElement = document.getElementById("imageDeProfil");
const changerPasswordButton = document.getElementById("changerPasswordButton");

console.log(account);

window.addEventListener("load", function() {
    updateProfileImageBackground();
    updateProfileInformationTable();
    updateAchievements()

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

    let supprimer = document.getElementById("deleteAccountButton");
    supprimer.addEventListener("click", function() {
        confirm("Voulez vous vraiment supprimer votre compte ?");
        supprimerCompte();
    });
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
    const achievements = dropdown.querySelector('.achievements_container');
    let open = false;

    btnDrop.addEventListener('click', () => {
        if (!open) {
            achievements.style.display = "block";
            dropdown.style.height = `${dropdown.scrollHeight+10}px`;
            open = !open;

        } else {
            dropdown.style.height = `${btnDrop.scrollHeight+5}px`;
            achievements.style.display = "none";
            open = !open;
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

        let h1 = document.createElement("h1");
        h1.innerHTML = achievement.name;

        let p = document.createElement("p");
        p.innerHTML = achievement.desc;

        let span = document.createElement("span");
        span.innerHTML = `${Math.min(achievement.valueCurrent, achievement.valueNeed)}/${achievement.valueNeed}`;

        if (achievement.unlocked) li.classList.add("unlocked");

        li.appendChild(img);
        li.appendChild(h1);
        li.appendChild(p);
        li.appendChild(span);

        ul.appendChild(li);
    }
    return ul;
}