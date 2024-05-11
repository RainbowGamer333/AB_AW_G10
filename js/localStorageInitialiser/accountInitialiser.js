import {AB_Utils} from "../AB_Utils.js";

export function createAccount(username, password, mail) {
    let account = {
        username: username,
        password: password,
        mail: mail,
        image: initialiseImageAleatoire(),
        role: "user",

        demineur: initialiseDemineur(),
        clicker: initialiseClicker(),
        towerDefense: initialiseTowerDefense()
    };
    return account;
}

function createAdmin() {
    let account = createAccount("Rainbow", "test", "mike.litoris@gmail.com");
    account.image = "image2.jpg";
    account.role = "admin";
    return account;
}

function initialiseImageAleatoire() {
    let number = Math.floor(Math.random() * 12) + 1;
    return "image" + number + ".jpg";
}

function initialiseDemineur() {
    return {
        facile: 0,
        moyen: 0,
        difficile: 0,
        achievements: initialiserAchievementsGame("demineur")
    }
}


function initialiseClicker() {
    return {
        score: 0,
        pieces: 0,
        achievements: initialiserAchievementsGame("clicker")
    }
}


function initialiseTowerDefense() {
    return {
        score: 0,
        achievements: initialiserAchievementsGame("towerDefense")
    }
}


function initialiserAchievementsGame(gameName) {
    const achievementPATH = "../../games/" + gameName + "/asset/data/achievement.json";
    let achievements = [];

    AB_Utils.readTextFile(achievementPATH, (achievement) => {
        let jsonArray = JSON.parse(achievement);
        if (!jsonArray) {
            console.error("JSON reading error");
            return;
        }

        jsonArray.forEach((json) => {
            let achievement = {
                name: json.name,
                desc: json.desc,
                imageURL: json.imageURL,
                valueNeed: json.value,
                valueCurrent: 0,
                unlocked: false
            };
            achievements.push(achievement);
        });
        return achievements;
    });
    return achievements;
}


/**
 * Retire tous les comptes sauf le compte admin
 */
export function clearAccounts() {
    localStorage.removeItem("accounts");
    localStorage.setItem("accounts", JSON.stringify([createAdmin()]));
}