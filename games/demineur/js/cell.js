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

    toggleFlag() {
        this._flag = !this._flag;
        this.element.classList.toggle("flag");
    }

    disable() {
        this._disabled = true;
    }

    afficheCellule() {
        this._visible = true;
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

    afficheFakeMine() {
        this.element.classList.add("fake-mine");
    }

    static creerCellule() {
        let cell = new Cell();
        cell.element.classList.add("cell", "unclicked");
        return cell;
    }
}