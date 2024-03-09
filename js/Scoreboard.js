export class Scoreboard {
    static updateScore(username, score) {
        console.log("updating score");
        const scores = document.querySelectorAll(".line");
        console.log(scores);

        let numLine = 1;
        while (numLine < scores.length && (scores[numLine].children[1].innerText < score || scores[numLine].children[1].innerText !== "(...)")) {
            numLine++;
        }

        if (numLine < scores.length) {
            replaceScore(numLine, username, score);
        }
    }
}


function replaceScore(numLine, username, score) {
    debugger;
    if (numLine === 11) return;
    if (username === "(...)") return;

    let line = document.querySelectorAll(".line")[numLine];
    let tempScore = line.children[1].innerHTML;
    let tempUsername = line.children[2].innerHTML;

    line.children[2].innerHTML = username;
    line.children[1].innerHTML = score;

    replaceScore(numLine+1, tempUsername, tempScore);
}