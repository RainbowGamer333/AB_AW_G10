import { Cell } from "./cellule.js";

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
            let td = createCell();
            tr.appendChild(td.element);
        }
        tbody.appendChild(tr);

    }
    grid.appendChild(tbody);
    miningGrid.appendChild(grid);
}

function createCell() {
    let cell = new Cell(0);

    // Ajouter un drapeau avec clique droit
    cell.element.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        cell.swapFlag();
    });

    return cell;
}



window.addEventListener("load", onload);