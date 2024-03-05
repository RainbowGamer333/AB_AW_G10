import {Utils} from "../games/towerDefense/js/utils/Utils.js";
import {Path} from "../games/towerDefense/js/constants/Path.js";
import {updateNavbar} from "./navbar.js";


function init(){
    //Create footer - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Utils.readTextFile("/component/footer.html", (text) =>{
        replaceComponent("footer",text);
    });

    //Create navbar - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Utils.readTextFile("/component/navbar.html", (text) =>{
        replaceComponent("nav",text);
        updateNavbar();
    });

    //Enable fullscreen - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const fullscreenElement = document.getElementById("toggle_fullscreen");
    if (fullscreenElement){
        fullscreenElement.addEventListener('click', function(){
            // if already full screen; exit
            // else go fullscreen
            const gameContainerElement = document.getElementById("gameContainer");
            if (document.fullscreenElement) {
                document.exitFullscreen();
                gameContainerElement.classList.remove("fullscreen");
            } else {
                gameContainerElement.classList.add("fullscreen");
                gameContainerElement.requestFullscreen();
            }
        });

        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener('webkitfullscreenchange', exitHandler);
        document.addEventListener('mozfullscreenchange', exitHandler);
        document.addEventListener('MSFullscreenChange', exitHandler);

        function exitHandler() {
            if (!document.fullscreenElement
                && !document.webkitIsFullScreen
                && !document.mozFullScreen
                && !document.msFullscreenElement) {
                ///fire your event
                console.log("KIKOKOK")
                const gameContainerElement = document.getElementById("gameContainer");
                gameContainerElement.classList.remove("fullscreen");
            }
        }

    }


    // Achievements popup - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const achievementSpawner = document.getElementById("achievement_spawner");
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



let velocity = -0.2;
let parallaxElements = document.getElementsByClassName("parallaxBG");
function update(){
    let pos = window.scrollY;
    for (let i = 0; i < parallaxElements.length;i++){
        const element = parallaxElements[i];
        let height = element.style.height-60;
        // let value = Math.round((height - pos) * velocity);
        let value = (height - pos) * velocity;

        element.style.backgroundPositionY = value  +  'px';
        // console.log(value)
    }
}



window.addEventListener('scroll', update);

window.addEventListener('load', function () {
    init();
})

