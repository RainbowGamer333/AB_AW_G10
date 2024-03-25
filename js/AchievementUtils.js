import {AB_Utils} from "./AB_Utils.js";

export default class AchievementUtils {
    static SEQUENCE = 0;
    static achievementsValues = [];
    static jsonData ;
    static userID;
    static gameID;

    static init (userID, gameID, achievementPATH){
        AB_Utils.readTextFile(achievementPATH, (achievement) => {
            let json = JSON.parse(achievement);
            if (!json) {
                console.error("JSON reading error");
                return;
            }
            AchievementUtils.jsonData = json;
            AchievementUtils.userID = userID;
            AchievementUtils.gameID = gameID;
            for (let i = 0; i < AchievementUtils.jsonData.length; i++){
                AchievementUtils.achievementsValues.push(
                    {
                        value : 0,
                        unlocked : false
                    });
            }
            //TODO HANDLE ERRORS
        });
    }
    static increaseCount(achievementID,amount){
        // let oldAmount =;
        // oldAmount += amount;
        // TDAchievements.counter[achievementID] = oldAmount;
        return AchievementUtils.achievementsValues[achievementID].value += amount;
    }

    static increaseCounterAndTryUnlock(achievementID,amount){
        if (sessionStorage.getItem("account") === null) return false;
        if (AchievementUtils.increaseCount(achievementID,amount) >= AchievementUtils.jsonData[achievementID].value &&
            !AchievementUtils.achievementsValues[achievementID].unlocked){
            AchievementUtils.achievementsValues[achievementID].unlocked = true;
            AchievementUtils.unlock(AchievementUtils.userID,AchievementUtils.gameID,achievementID);
            return true;
        }
        return false;
    }

    static unlock(userID,gameName,achievementID){
        console.log("unlocking achievement");
        let account = JSON.parse(sessionStorage.getItem("account"));
        let achievementsList;
        switch (gameName) {
            case "demineur":
                achievementsList = account.demineur.achievements;
                break;
            case "clicker":
                achievementsList = account.clicker.achievements;
                break;
            case "towerDefense":
                achievementsList = account.towerDefense.achievements;
                break;
            default:
                console.error("Game not found");
                return;
        }
        let achievement = achievementsList[achievementID];
        achievement.achieved = true;
        console.log(achievement);




        this.displayAchievement(gameName,achievementID);
    }

    static displayAchievement(gameName, achievementID) {
        console.log("achievement_spawner clicked");
        const achievementPATH = "/games/" + gameName + "/asset/data/achievement.json";
        AB_Utils.readTextFile(achievementPATH, (achievement) => {
            let json = JSON.parse(achievement);
            if (!json) {
                console.log("JSON reading error");
                return;
            }
            //TODO HANDLE ERRORS

            let data = json[achievementID];

            AB_Utils.readTextFile("/component/achievement.html", (text) => {
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

}