export function initialiserScoresDemineur() {
    clearScoresDemineur();
    initialiserScoresDemineurFacile();

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
    scores.push({nom: "Rainbow", score: 60});
    scores.push({nom: "Rainbow", score: 70});
    scores.push({nom: "Rainbow", score: 80});
    localStorage.setItem("scoreDemineurFacile", JSON.stringify(scores));
}

function clearScoresDemineur() {
    localStorage.removeItem("scoreDemineurFacile");
    localStorage.removeItem("scoreDemineurMoyen");
    localStorage.removeItem("scoreDemineurDifficile");
}


export function initialiserScoresClicker() {
    clearScoresClicker();
    let scores = [];
    //TODO

    localStorage.setItem("scoreClicker", JSON.stringify(scores));
}

function clearScoresClicker() {
    localStorage.removeItem("scoreClicker");
    localStorage.setItem("scoreClicker", JSON.stringify([]));

}


export function initialiserScoresTowerDefense() {
    clearScoresTowerDefense();
    let scores = [];
    //TODO

    localStorage.setItem("scoreTowerDefense", JSON.stringify(scores));
}

function clearScoresTowerDefense() {
    localStorage.removeItem("scoreTowerDefense");
    localStorage.setItem("scoreTowerDefense", []);
}