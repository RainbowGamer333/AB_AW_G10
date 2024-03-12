import {Path} from "../games/towerDefense/js/constants/Path.js";
import {updateNavbar} from "./navbar.js";
import {AB_Utils} from "./AB_Utils.js";
import {ScoreboardClicker, ScoreboardDemineur, ScoreboardTowerDefense} from "./Scoreboard.js";
import AchievementUtils from "./AchievementUtils.js";


function init(){
    //Create footer - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    AB_Utils.readTextFile("/component/footer.html", (text) =>{
        AB_Utils.replaceComponent("footer",text);
    });

    //Create navbar - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    AB_Utils.readTextFile("/component/navbar.html", (text) =>{
        AB_Utils.replaceComponent("nav",text);
        updateNavbar();
    });

    //Create scoreboard - - - - - - - - - - - - - - - - - - - - - - - - - -
    const scoreboardElement = document.getElementById("scoreboard");
    if (scoreboardElement){
        AB_Utils.readTextFile("/component/scoreboard.html", (text) =>{
            AB_Utils.replaceComponent("scoreboard",text, function (completed) {
                if (completed){
                    switch(window.location.pathname.split("/")[3]) {
                        case "demineur":
                            ScoreboardDemineur.displayFacile();
                            break;
                        case "clicker":
                            ScoreboardClicker.displayScoreboard();
                            break;
                        case "towerDefense":
                            ScoreboardTowerDefense.displayScoreboard();
                            break;
                    }
                }
            });
        });
    }

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
    // const achievementSpawner = document.getElementById("achievement_spawner");
    // document.addEventListener("click", function () {
    //     AchievementUtils.unlock("userName","towerDefense",0);
    // });
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

