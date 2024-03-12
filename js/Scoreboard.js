class Scoreboard {
    static displayScore(gameName) {
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

    static updateScore(game, username, score) {
        console.log("updating score");
        let gameName = this.getStorageGameName(game);
        let scores = JSON.parse(localStorage.getItem(gameName));
        scores.push({
            nom: username,
            score: score
        });
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem(gameName, JSON.stringify(scores));
        this.displayScore(game);
    }
}

export class ScoreboardDemineur extends Scoreboard {
    static displayFacile() {
        super.displayScore("scoreDemineurFacile");
    }

    static updateFacile(username, score) {
        super.updateScore("scoreDemineurFacile", username, score);
    }

    static displayMoyen() {
        super.displayScore("scoreDemineurMoyen");
    }

    static updateMoyen(username, score) {
        super.updateScore("scoreDemineurMoyen", username, score);
    }

    static displayDifficile() {
        super.displayScore("scoreDemineurDifficile");
    }

    static updateDifficile(username, score) {
        super.updateScore("scoreDemineurDifficile", username, score);
    }
}

export class ScoreboardClicker extends Scoreboard {
    static displayScore() {
        super.displayScore("scoreClicker");
    }

    static updateScore(username, score) {
        super.updateScore("scoreClicker", username, score);
    }
}

export class ScoreboardTowerDefense extends Scoreboard {
    static displayScore() {
        super.displayScore("scoreTowerDefense");
    }

    static updateScore(username, score) {
        super.updateScore("scoreTowerDefense", username, score);
    }
}