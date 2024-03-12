import {AB_Utils} from "../../../../js/AB_Utils.js";
import AchievementUtils from "../../../../js/AchievementUtils.js";

export default class TDAchievements {

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
            TDAchievements.jsonData = json;
            for (let i = 0; i < TDAchievements.jsonData.length; i++){
                console.log(TDAchievements.jsonData[i].name)
                TDAchievements.achievementsValues.push({
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
        return TDAchievements.achievementsValues[achievementID].value += amount;
    }

    static increaseCounterAndTryUnlock(achievementID,amount){
        if (TDAchievements.increaseCount(achievementID,amount) >= TDAchievements.jsonData[achievementID].value &&
            !TDAchievements.achievementsValues[achievementID].unlocked){
            TDAchievements.achievementsValues[achievementID].unlocked = true;
            AchievementUtils.unlock(TDAchievements.userID,"towerDefense",achievementID);
            return true;
        }
        return false;
    }
}