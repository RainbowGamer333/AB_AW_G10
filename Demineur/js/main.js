import {Images} from "images.js";

function onload() {
    console.log("Début onload()");
    let img = new Images();
    createGrid(10, 10);
}

function createGrid(numberRows, numberColumns) {
    let miningGrid = document.getElementById("gameBoard");


    let grid = document.createElement("table");
    grid.id = "miningGrid";
    let tbody = document.createElement("tbody");

    // Génération table
    for (let i = 0; i < numberRows; i++) {
        let tr = document.createElement("tr");

        for (let j = 0; j < numberColumns; j++) {
            let td = document.createElement("td");
            td.appendChild();
            tr.appendChild(td);
        }
        tbody.appendChild(tr);

    }
    grid.appendChild(tbody);
    miningGrid.appendChild(grid);
}

function addFlag(tr, td) {


}


window.addEventListener("load", onload);