export class Utils{
    static randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomIndexFromTrueBooleans(list){
        let trueIndexes = [];
        for (let i = 0; i < list.length; i++){
            let val = list[i];
            if(val==true){
                trueIndexes.push(i);
            }
        }
        const choices = this.randomIntFromInterval(0,trueIndexes.length-1);
        return trueIndexes[choices];
    }

    static distance(go1, go2) {
        let x1 = go1.x;
        let y1 = go1.y;
        let x2 = go2.x;
        let y2 = go2.y;

        const distance = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
        //console.log("Distance = " + distance);
        return distance;
    }

    static readTextFile(file, callback) {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    /**
     * @param {String} HTML representing a single element.
     * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
     * @return {Element | HTMLCollection | null}
     */
    static fromHTML(html, trim = true) {
        // Process the HTML string.
        html = trim ? html.trim() : html;
        if (!html) return null;

        // Then set up a new template element.
        const template = document.createElement('template');
        template.innerHTML = html;
        const result = template.content.children;

        // Then return either an HTMLElement or HTMLCollection,
        // based on whether the input HTML had one or more roots.
        if (result.length === 1) return result[0];
        return result;
    }


}