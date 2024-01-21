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

    toggleFlag() {
        if (this._flag) {
            this._flag = false;
            this.element.classList.remove("cell-flag");
        } else {
            this._flag = true;
            this.element.classList.add("cell-flag");
        }
    }

    isMine() {
        return this._valeur === -1;
    }

    afficheCellule() {
        this._visible = true;
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
            case 4:
                this.element.classList.add("cell-4");
                return;
            case 5:
                this.element.classList.add("cell-5");
                return;
            case 6:
                this.element.classList.add("cell-6");
                return;
            case 7:
                this.element.classList.add("cell-7");
                return;
            case 8:
                this.element.classList.add("cell-8");
                return;
        }
    }
}