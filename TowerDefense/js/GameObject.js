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

    addComponent(component){
        this.components.push(component);
        component.parent = this;
    }

    removeComponent(component){
        this.components.remove(component);//TODO
        component.parent = null;
    }
}