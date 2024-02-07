import {Utils} from "../games/towerDefense/js/utils/Utils.js";
import {Path} from "../games/towerDefense/js/constants/Path.js";


function init(){
    //Create footer
    Utils.readTextFile("/component/footer.html", (text) =>{
        replaceComponent("footer",text);
    });

    //Create navbar
    Utils.readTextFile("/component/navbar.html", (text) =>{
        replaceComponent("nav",text);
    });

}

function replaceComponent(elementTagName, newTagHtml){
    const oldElement = document.getElementsByTagName(elementTagName)[0];
    const newElement = document.createElement(elementTagName);
    newElement.innerHTML = newTagHtml;
    if (oldElement){
        oldElement.replaceWith(newElement)
    }else{
        console.log("Node with the tag "+elementTagName+" not found.")
    }
}

window.addEventListener('load', function () {
    init();
})

