class Scoreboard {
    static displayScore(gameName) {
        let scoreName = this.getStorageGameName(gameName);

        let scores = JSON.parse(localStorage.getItem(scoreName));
        let scoreLines = document.querySelectorAll(".line");

        for (let i = 0; i < scoreLines.length - 1; i++) {
            scoreLines[i+1].querySelector(".score").innerText = scores[i].score;
            scoreLines[i+1].querySelector(".name").innerText = scores[i].nom;
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

    static getStorageGameName(gameName) {
        switch (gameName) {
            case "demineur":
                return "scoreDemineur";
            case "clicker":
                return "scoreClicker";
            default:
                return "scoreTowerDefense";
        }
    }
}

export class ScoreboardDemineur extends Scoreboard {
    static displayScore() {
        super.displayScore("demineur");
    }

    static updateScore(username, score) {
        super.updateScore("demineur", username, score);
    }
}

export class ScoreboardClicker extends Scoreboard {
    static displayScore() {
        super.displayScore("clicker");
    }

    static updateScore(username, score) {
        super.updateScore("clicker", username, score);
    }
}

export class ScoreboardTowerDefense extends Scoreboard {
    static displayScore() {
        super.displayScore("towerDefense");
    }

    static updateScore(username, score) {
        super.updateScore("towerDefense", username, score);
    }
}