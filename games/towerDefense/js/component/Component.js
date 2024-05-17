// Classe "abstraite" destinée à est override par les autres classes qui en héritent
export class Component {
    //A game object which contains the component
    parent;

    //The update function is called at each iteration of the game loop if the component
    // is attached to a GameObject, it handles the model part of the code.
    update(dt){

    }


    //Same as the update function, but handles the visual part instead.
    render() {

    }
}