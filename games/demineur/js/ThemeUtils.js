import {Smiley} from "./smiley.js";

export default class ThemeUtils {
    static theme = "retro";


    static setTheme(theme) {
        let variables = ThemeUtils.getThemeVariablesFromCss();

        for (let variable of variables) {
            ThemeUtils.changeVariable(variable, theme);
        }

        Smiley.theme = theme;
        ThemeUtils.theme = theme;
    }
    
    static getThemeVariablesFromCss() {
        let root = document.documentElement;
        let rootStyle = getComputedStyle(root);
        let variablesCSS = [];

        variablesCSS.push("--url-flag");
        variablesCSS.push("--url-mine");
        variablesCSS.push("url-fake-flag");

        return variablesCSS;
    }


    static changeVariable(variable, theme) {
        let root = document.documentElement;
        let rootStyle = getComputedStyle(root);
        let value = rootStyle.getPropertyValue(variable);
        
        root.style.setProperty(variable, value.replace(ThemeUtils.theme, theme));
    }
}