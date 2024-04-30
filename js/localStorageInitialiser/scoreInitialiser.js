export function initialiserScores() {
    initialiserScoresDemineur();
    initialiserScoresClicker();
    initialiserScoresTowerDefense();
}


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

    sortScores(scores, true);
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

    sortScores(scores, true);
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

    sortScores(scores, true);
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

    sortScores(scores, true);
    localStorage.setItem("scoreClicker", JSON.stringify(scores));
}

function clearScoresClicker() {
    localStorage.removeItem("scoreClicker");
}


export function initialiserScoresTowerDefense() {
    clearScoresTowerDefense();
    let scores = [
        {nom: "Feldup", score: 7800},
        {nom: "MicBuffa", score: 48950},
        {nom: "Stephane06", score: 480},
        {nom: "Géralt", score: 0 },//125450
        {nom: "Florent78", score: 48900},
        {nom: "StephDaSilv", score: 5480},
        {nom: "Quentin12", score: 24780},
        {nom: "GG-Ez", score: 1450},
        {nom: "Raumin", score: 1},//98650
        {nom: "Loughan", score: 0}//72400
    ];

    sortScores(scores, true);
    localStorage.setItem("scoreTowerDefense", JSON.stringify(scores));
}

function clearScoresTowerDefense() {
    localStorage.removeItem("scoreTowerDefense");
}

export function sortScores(scores, ascending) {
    if (!ascending) scores.sort((a, b) => a.score - b.score);
    else scores.sort((a, b) => b.score - a.score);
}