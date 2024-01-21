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

    addValeurClass() {
        switch(this._valeur) {
            case 1:
                this.element.classList.add("cell-1");
                return;
            case 2:
                this.element.classList.add("cell-2");
                return;
            case 3:
                this.element.classList.add("cell-3");
                return;
        }
    }
}