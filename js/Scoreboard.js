export class Scoreboard {
    static displayScore() {
        let scores = JSON.parse(localStorage.getItem("scoreDemineur"));
        let scoreLines = document.querySelectorAll(".line");

        for (let i = 0; i < scoreLines.length - 1; i++) {
            scoreLines[i+1].querySelector(".score").innerText = scores[i].score;
            scoreLines[i+1].querySelector(".name").innerText = scores[i].nom;
        }
    }

    static updateScore(username, score) {
        console.log("updating score");
        let scores = JSON.parse(localStorage.getItem("scoreDemineur"));
        scores.push({
            nom: username,
            score: score
        });
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem("scoreDemineur", JSON.stringify(scores));
        this.displayScore();
    }
}