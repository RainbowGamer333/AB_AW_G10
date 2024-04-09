import {Path} from "../games/towerDefense/js/constants/Path.js";
import {updateNavbar} from "./navbar.js";
import {AB_Utils} from "./AB_Utils.js";
import {ScoreboardClicker, ScoreboardDemineur, ScoreboardTowerDefense} from "./Scoreboard.js";
import AchievementUtils from "./AchievementUtils.js";
import {VolumeDemineur} from "./Volume.js";

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


    //Create volume bar - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const volumeElement = document.getElementById("volume_range");
    if (volumeElement){
        volumeElement.addEventListener('input', function(){
            const volume = volumeElement.value;
            
            switch(window.location.pathname.split("/")[3]) {
                case "demineur":
                    VolumeDemineur.updateVolume(volume/100);
            }
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
}

const gameCards = document.querySelectorAll(".gameCard");
gameCards.forEach(gameCard => {
    gameCard.addEventListener("click", function (e) {
        e.preventDefault();
        let href = gameCard.getAttribute("href");
        if (JSON.parse(sessionStorage.getItem("account"))) window.location.href = href;
        else window.location.href = "/AB_AW_G10/account/log-in.html";
    });

    gameCard.addEventListener("mouseover", function () {
        gameCard.style.cursor = "pointer";
    });
});





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

