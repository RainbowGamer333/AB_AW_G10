import {searchData} from "../asset/data/searchData.js";
export default class SearchUtils{
    static searchGames(name){
        name = name.toLowerCase();
        let result = [];
        searchData.forEach(gameData => {
            if (gameData.display_name.includes(name)){
                result.push(gameData);
                //TODO check aliases
            } else if (gameData.display_name_aliases.length !== 0){
                gameData.display_name_aliases.forEach(alias => {
                    if (alias.includes(name)){
                        result.push(gameData);
                    }
                });
            }
        });
        return result;
    }
}