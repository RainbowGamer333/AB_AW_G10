export function initialiserScoresDemineur() {
    clearScoresDemineur();
    let scores = [];
    for (var i = 0; i < 10; i++) {
        scores.push({
            nom: "AAA" + i,
            score: 9999 - (1111 * i)
        });
    }
    localStorage.setItem("scoreDemineur", JSON.stringify(scores));
}

function clearScoresDemineur() {
    localStorage.removeItem("scoreDemineur");
    localStorage.setItem("scoreDemineur", JSON.stringify([]));
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