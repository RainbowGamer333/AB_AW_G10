import { Cell } from "./cell.js";

function onload() {
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
            let td = Cell.createCell();
            td.afficheCellule();
            tr.appendChild(td.element);
        }
        tbody.appendChild(tr);

    }
    grid.appendChild(tbody);
    miningGrid.appendChild(grid);
}


function afficherMines() {
    let cells = document.getElementsByClassName("cell-mine");
    for (let i = 0; i < cells.length; i++) {
        cells[i].afficheCellule();
    }
}



window.addEventListener("load", onload);