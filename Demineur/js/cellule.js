export class Cell {
    element;
    _valeur;
    _visible;
    _flag;

    constructor(valeur) {
        this.element = document.createElement("td");
        this._valeur = valeur;
        this._visible = false;
        this._flag = false;
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

    swapFlag() {
        if (this._flag) {
            this._flag = false;
            this.element.classList.remove("flag");
        } else {
            this._flag = true;
            this.element.classList.add("flag");
        }
    }

    isMine() {
        return this._valeur === -1;
    }
}