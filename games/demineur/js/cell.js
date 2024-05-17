/**
 * Classe représentant une cellule du démineur. Une cellule peut prendre plusieurs valeurs :
 * - -3 : fausse mine
 * - -2 : mine
 * - -1 : mine non découverte
 * - 0 : cellule vide
 * - 1 à 8 : cellule avec un nombre de mines adjacentes
 * Une cellule peut également avoir un drapeau
 */
export class Cell {
    element;
    _valeur;
    _visible;
    _flag;

    constructor() {
        this.element = document.createElement("td");
        this._visible = false;
        this._flag = false;
        this._disabled = false;
    }


    get valeur() {
        return this._valeur;
    }

    get visible() {
        return this._visible;
    }

    get flag() {
        return this._flag;
    }

    get disabled() {
        return this._disabled;
    }

    set valeur(valeur) {
        this._valeur = valeur;
    }

    setMine() {
        this._valeur = -1;
    }

    isMine() {
        return this._valeur === -1;
    }

    /**
     * Ajoute un drapeau à la cellule.
     */
    addFlag() {
        this._flag = true;
        this.element.classList.add("flag");
    }

    /**
     * Retire le drapeau de la cellule.
     */
    removeFlag() {
        this._flag = false;
        this.element.classList.remove("flag");
    }

    disable() {
        this._disabled = true;
    }

    /**
     * Ajoute la classe correspondant à la valeur de la cellule. Ne fonctionne pas si la cellule est désactivée ou si elle a un drapeau.
     */
    afficheCellule() {
        this._visible = true;
        if (this.disabled || this.flag) return;
        switch(this._valeur) {
            case -3:
                this.element.classList.add("fake-mine");
                return;
            case -2:
                this.element.classList.add("mine");
                this.element.classList.add("clicked");
                return;
            case -1:
                if (!this.flag) this.element.classList.add("mine");
                return;
            case 0:
                this.element.classList.add("zero");
                return;
            case 1:
                this.element.classList.add("one");
                return;
            case 2:
                this.element.classList.add("two");
                return;
            case 3:
                this.element.classList.add("three");
                return;
            case 4:
                this.element.classList.add("four");
                return;
            case 5:
                this.element.classList.add("five");
                return;
            case 6:
                this.element.classList.add("six");
                return;
            case 7:
                this.element.classList.add("seven");
                return;
            case 8:
                this.element.classList.add("eight");
                return;
        }
    }

    /**
     * Réinitialise la cellule à son état initial.
     */
    reinitialiserCellule() {
        this.valeur = 0;
        this._visible = false;
        this._flag = false;
        this._disabled = false;
        this.element.classList = [];
        this.element.classList.add("cell", "unclicked");
    }

    /**
     * Crée une nouvelle cellule.
     * @returns {Cell} La cellule créée.
     */
    static creerCellule() {
        let cell = new Cell();
        cell.element.classList.add("cell", "unclicked");
        return cell;
    }
}