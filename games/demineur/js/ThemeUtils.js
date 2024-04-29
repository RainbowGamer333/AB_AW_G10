//Chercher tt les variables css
//Au changement de thème, changer les valeurs des variables css


export default class ThemeUtils {

    static setTheme(theme) {
        ThemeUtils.getThemeVariablesFromCss();
    }
    
    static getThemeVariablesFromCss() {
        let root = document.documentElement;
        let rootStyle = getComputedStyle(root);
        console.log(rootStyle.getPropertyValue("--url-retro-flag").split("/"));

        //root.style.setProperty("--url-retro-flag", "url('../asset/themes/smiley/grille/flag.png')");
        //console.log(rootStyle.getPropertyValue("--url-retro-flag"));
    }




    static changeVariable(variable, theme) {
        let root = document.documentElement;
        let rootStyle = getComputedStyle(root);
        let value = rootStyle.getPropertyValue(variable);
        let themesPath = "../asset/themes/";

        root.style.setProperty(variable, value.replace("retro", theme));
        console.log(rootStyle.getPropertyValue(variable));
    }
}