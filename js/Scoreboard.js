class Scoreboard {
    static displayScoreboard(gameName) {
        let scores = JSON.parse(localStorage.getItem(gameName));
        let scoreLines = document.querySelectorAll(".line");

        try {
            for (let i = 0; i < scoreLines.length - 1; i++) {
                scoreLines[i+1].querySelector(".score").innerText = scores[i].score;
                scoreLines[i+1].querySelector(".name").innerText = scores[i].nom;
            }
        } catch (e) {
            console.error(gameName + " n'est pas un type de score valide");
        }

    }

    static updateScoreboard(gameName, username, score, ascending = false) {
        console.log("updating score");
        let scores = JSON.parse(localStorage.getItem(gameName));
        scores.push({
            nom: username,
            score: score
        });

        if (!ascending) scores.sort((a, b) => a.score - b.score);
        else scores.sort((a, b) => b.score - a.score);

        localStorage.setItem(gameName, JSON.stringify(scores));
        this.displayScoreboard(gameName);
    }
}

export class ScoreboardDemineur extends Scoreboard {
    static displayFacile() {
        super.displayScoreboard("scoreDemineurFacile");
    }

    static updateFacile(username, score) {
        super.updateScoreboard("scoreDemineurFacile", username, score, false);
    }

    static displayMoyen() {
        super.displayScoreboard("scoreDemineurMoyen");
    }

    static updateMoyen(username, score) {
        super.updateScoreboard("scoreDemineurMoyen", username, score, false);
    }

    static displayDifficile() {
        super.displayScoreboard("scoreDemineurDifficile");
    }

    static updateDifficile(username, score) {
        super.updateScoreboard("scoreDemineurDifficile", username, score, false);
    }
}

export class ScoreboardClicker extends Scoreboard {
    static displayScore() {
        super.displayScoreboard("scoreClicker");
    }

    static updateScore(username, score) {
        super.updateScoreboard("scoreClicker", username, score, false);
    }
}

export class ScoreboardTowerDefense extends Scoreboard {
    static displayScore() {
        super.displayScoreboard("scoreTowerDefense");
    }

    static updateScore(username, score) {
        super.updateScoreboard("scoreTowerDefense", username, score, true);
    }
}