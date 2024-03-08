export function initialiserScoresDemineur() {
    clearScoresDemineur();
    var scores = [];
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
    localStorage.setItem("scoreDemineur", []);
}