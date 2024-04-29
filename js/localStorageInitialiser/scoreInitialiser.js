export function initialiserScoresDemineur() {
    clearScoresDemineur();
    initialiserScoresDemineurFacile();
    initialiserScoresDemineurMoyen();
    initialiserScoresDemineurDifficile();
}

function initialiserScoresDemineurFacile() {
    let scores = [];
    scores.push({nom: "Rainbow", score: 13});
    scores.push({nom: "Rainbow", score: 17});
    scores.push({nom: "Rainbow", score: 24});
    scores.push({nom: "Rainbow", score: 30});
    scores.push({nom: "Rainbow", score: 35});
    scores.push({nom: "Rainbow", score: 42});
    scores.push({nom: "Rainbow", score: 50});
    scores.push({nom: "Rainbow", score: 58});
    scores.push({nom: "Rainbow", score: 65});
    scores.push({nom: "Rainbow", score: 90});
    localStorage.setItem("scoreDemineurFacile", JSON.stringify(scores));
}

function initialiserScoresDemineurMoyen() {
    let scores = [];
    scores.push({nom: "Rainbow", score: 75});
    scores.push({nom: "Rainbow", score: 81});
    scores.push({nom: "Rainbow", score: 86});
    scores.push({nom: "Rainbow", score: 89});
    scores.push({nom: "Rainbow", score: 95});
    scores.push({nom: "Rainbow", score: 103});
    scores.push({nom: "Rainbow", score: 108});
    scores.push({nom: "Rainbow", score: 116});
    scores.push({nom: "Rainbow", score: 125});
    scores.push({nom: "Rainbow", score: 140});
    localStorage.setItem("scoreDemineurMoyen", JSON.stringify(scores));
}

function initialiserScoresDemineurDifficile() {
    let scores = [];
    scores.push({nom: "Rainbow", score: 139});
    scores.push({nom: "Rainbow", score: 145});
    scores.push({nom: "Rainbow", score: 167});
    scores.push({nom: "Rainbow", score: 188});
    scores.push({nom: "Rainbow", score: 202});
    scores.push({nom: "Rainbow", score: 213});
    scores.push({nom: "Rainbow", score: 229});
    scores.push({nom: "Rainbow", score: 244});
    scores.push({nom: "Rainbow", score: 276});
    scores.push({nom: "Rainbow", score: 289});
    localStorage.setItem("scoreDemineurDifficile", JSON.stringify(scores));
}

function clearScoresDemineur() {
    localStorage.removeItem("scoreDemineurFacile");
    localStorage.removeItem("scoreDemineurMoyen");
    localStorage.removeItem("scoreDemineurDifficile");
}


export function initialiserScoresClicker() {
    clearScoresClicker();
    let scores = [];
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    scores.push({nom: "John Doe", score: 0});
    localStorage.setItem("scoreClicker", JSON.stringify(scores));
}

function clearScoresClicker() {
    localStorage.removeItem("scoreClicker");
    localStorage.setItem("scoreClicker", JSON.stringify([]));

}


export function initialiserScoresTowerDefense() {
    clearScoresTowerDefense();
    let scores = [
        {nom: "F", score: 1},
        {nom: "FabuLeMich", score: 2},
        {nom: "Stephane06", score: 3},
        {nom: "Quentin12", score: 4},
        {nom: "Florent78", score: 5},
        {nom: "A", score: 6},
        {nom: "B", score: 7},
        {nom: "C", score: 8},
        {nom: "D", score: 9},
        {nom: "E", score: 10}
    ];
    //TODO

    localStorage.setItem("scoreTowerDefense", JSON.stringify(scores));
}

function clearScoresTowerDefense() {
    localStorage.removeItem("scoreTowerDefense");
    localStorage.setItem("scoreTowerDefense", []);
}