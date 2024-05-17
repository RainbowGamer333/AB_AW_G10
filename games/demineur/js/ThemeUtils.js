import {Smiley} from "./smiley.js";

/**
 * Classe utilitaire pour la gestion des thèmes.
 */
export default class ThemeUtils {
    static theme = "retro";

    /**
     * Change le thème du jeu.
     * @param theme Thème à appliquer
     */
    static setTheme(theme) {
        let variables = ThemeUtils.getThemeVariablesFromCss();

        for (let variable of variables) {
            ThemeUtils.changeVariable(variable, theme);
        }

        Smiley.theme = theme;
        ThemeUtils.theme = theme;
    }

    /**
     * Récupère les variables CSS du thème actuel.
     * @returns {*[]} la liste des variables CSS du thème actuel
     */
    static getThemeVariablesFromCss() {
        let root = document.documentElement;
        let variablesCSS = [];

        variablesCSS.push("--url-flag");
        variablesCSS.push("--url-mine");
        variablesCSS.push("url-fake-flag");

        return variablesCSS;
    }


    /**
     * Remplace l'ancien thème de la variable par le nouveau.
     * @param variable la variable CSS à changer
     * @param theme le thème à appliquer
     */
    static changeVariable(variable, theme) {
        let root = document.documentElement;
        let rootStyle = getComputedStyle(root);
        let value = rootStyle.getPropertyValue(variable);
        
        root.style.setProperty(variable, value.replace(ThemeUtils.theme, theme));
    }
}