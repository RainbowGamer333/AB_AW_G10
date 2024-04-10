import {searchData} from "../asset/data/searchData.js";
export default class SearchUtils{
    static searchGames(name){
        name = name.toLowerCase();
        let result = [];
        for (let i=0; i< searchData.length; i++) {
            let gameData = searchData[i];
            if (gameData.display_name.startsWith(name)){
                result.push(gameData);
                //TODO check aliases
            } else if (gameData.display_name_aliases.length !== 0){
                for (let j=0; j< gameData.display_name_aliases.length; j++){
                    const alias = gameData.display_name_aliases[j];
                    if (alias.startsWith(name)){
                        result.push(gameData);
                        // break;
                    }
                }
            }
        }
        return result;
    }
}