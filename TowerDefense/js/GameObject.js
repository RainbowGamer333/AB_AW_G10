export class GameObject {
    name;
    components = [];
    x;
    y;

    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
    update(dt){
        for(let i=0; i<this.components.length; i++){
            this.components[i].update(dt);
        }
    }

    render(){
        for(let i=0; i<this.components.length; i++){
            this.components[i].render();
        }
    }
}