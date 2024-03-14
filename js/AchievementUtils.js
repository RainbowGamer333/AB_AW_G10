import {AB_Utils} from "./AB_Utils.js";

export default class AchievementUtils {
    static SEQUENCE = 0;
    static achievementsValues = [];
    static jsonData ;
    static userID;

    static init (userID,achievementPATH){
        AB_Utils.readTextFile(achievementPATH, (achievement) => {
            let json = JSON.parse(achievement);
            if (!json) {
                console.log("JSON reading error");
                return;
            }
            AchievementUtils.jsonData = json;
            for (let i = 0; i < AchievementUtils.jsonData.length; i++){
                console.log(AchievementUtils.jsonData[i].name)
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
        if (AchievementUtils.increaseCount(achievementID,amount) >= AchievementUtils.jsonData[achievementID].value &&
            !AchievementUtils.achievementsValues[achievementID].unlocked){
            AchievementUtils.achievementsValues[achievementID].unlocked = true;
            AchievementUtils.unlock(AchievementUtils.userID,"towerDefense",achievementID);
            return true;
        }
        return false;
    }

    static unlock(userID,gameID,achievementID){
        //TODO DO THE BACKEND CODE
        this.displayAchievement(gameID,achievementID);
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