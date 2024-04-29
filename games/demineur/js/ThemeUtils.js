//Chercher tt les variables css
//Au changement de thème, changer les valeurs des variables css


export default class ThemeUtils {
    static theme = "retro";


    static setTheme(theme) {
        let variables = ThemeUtils.getThemeVariablesFromCss();

        for (let variable of variables) {
            ThemeUtils.changeVariable(variable, theme);
        }

        ThemeUtils.theme = theme;
    }
    
    static getThemeVariablesFromCss() {
        let root = document.documentElement;
        let rootStyle = getComputedStyle(root);
        let variablesCSS = [];

        variablesCSS.push("--url-flag");
        variablesCSS.push("--url-mine");
        variablesCSS.push("url-fake-flag");

        /*
        for (let property of rootStyle) {
            if (property.includes("--url-")) {
                variablesCSS.push(property);
            }
        }
         */
        return variablesCSS;
    }


    static changeVariable(variable, theme) {
        let root = document.documentElement;
        let rootStyle = getComputedStyle(root);
        let value = rootStyle.getPropertyValue(variable);
        
        root.style.setProperty(variable, value.replace(ThemeUtils.theme, theme));
    }
}