export class AB_Utils {
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

    static replaceComponent(elementTagName, newTagHtml, callback = null){
        let oldElement = document.getElementsByTagName(elementTagName)[0];
        if (!oldElement) oldElement =  document.getElementById(elementTagName);
        const newElement = document.createElement(elementTagName);
        newElement.innerHTML = newTagHtml;
        if (oldElement){
            oldElement.replaceWith(newElement)
        }else{
            console.log("Node with the tag "+elementTagName+" not found.")
        }
        if (callback) {
            callback(true);
        }
    }
}

