import {GameObject} from "../GameObject.js";

const spawnInterval = 1;
let accumulatedTime = 0.0; // Temps accumulé depuis le dernier spawn
export class MonsterSpawner extends GameObject{
    update(dt) {
        // Accumuler le deltaTime
        accumulatedTime += dt;


        // Vérifier si le temps accumulé atteint ou dépasse l'intervalle de spawn
        if (accumulatedTime >= spawnInterval) {
            // Effectuer l'action (dans ce cas, le spawn de monstres)
            console.log("Spawning monsters");

            // Réinitialiser le temps accumulé
            accumulatedTime = 0;
        }

    }
}