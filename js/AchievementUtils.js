import {AB_Utils} from "./AB_Utils.js";

export default class AchievementUtils {
    static SEQUENCE = 0;
    static account = JSON.parse(sessionStorage.getItem("account"));
    static gameName;
    static achievements;

    static init (gameName){
        AchievementUtils.gameName = gameName;
        switch (gameName) {
            case "demineur":
                AchievementUtils.achievements = AchievementUtils.account.demineur.achievements;
                break;
            case "clicker":
                AchievementUtils.achievements = AchievementUtils.account.clicker.achievements;
                break;
            case "towerDefense":
                AchievementUtils.achievements = AchievementUtils.account.towerDefense.achievements;
                break;
            default:
                console.error("Game not found");
                return;
        }
    }
    static increaseCount(achievementID,amount){
        return AchievementUtils.achievements[achievementID].valueCurrent += amount;
    }

    static increaseCounterAndTryUnlock(achievementID,amount){
        if (AchievementUtils.increaseCount(achievementID,amount) >= AchievementUtils.achievements[achievementID].valueNeed &&
            !AchievementUtils.achievements[achievementID].unlocked) {
            AchievementUtils.unlock(achievementID);
            return true;
        }
        return false;
    }

    static unlock(achievementID){
        console.log("unlocking achievement");

        AchievementUtils.achievements[achievementID].unlocked = true;
        sessionStorage.setItem("account",JSON.stringify(AchievementUtils.account));

        this.displayAchievement(achievementID);
    }

    static displayAchievement(achievementID) {
        const achievementPATH = "../games/" + AchievementUtils.gameName + "/asset/data/achievement.json";
        AB_Utils.readTextFile(achievementPATH, (achievement) => {
            let json = JSON.parse(achievement);
            if (!json) {
                console.log("JSON reading error");
                return;
            }
            //TODO HANDLE ERRORS

            let data = json[achievementID];

            AB_Utils.readTextFile("../component/achievement.html", (text) => {
                let elementTagName = "achievement_spawner";
                const oldElement = document.getElementById(elementTagName);
                const newElement = document.createElement("div");
                newElement.id = "achievement_"+AchievementUtils.SEQUENCE++;
                newElement.innerHTML = text;

                const titleElement = newElement.querySelector(".title");
                titleElement.innerText = data.name;

                const imageElement = newElement.querySelector(".picture");
                imageElement.src = data.imageURL;

                const descElement = newElement.querySelector(".description");
                descElement.innerText = data.desc;

                if (oldElement) {
                    oldElement.appendChild(newElement);
                    setTimeout(function () {
                        setTimeout(function () {
                            newElement.remove();
                        },500)
                        newElement.classList.add("disappear");
                    },6000)
                }
            });

        });
    }

    static resetAchievements() {
        AchievementUtils.achievements.forEach((achievement) => {
            achievement.valueCurrent = 0;
            achievement.unlocked = false;
        });
    }

}