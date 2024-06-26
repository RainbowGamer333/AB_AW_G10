import {updateNavbar} from "./navbar.js";
import {AB_Utils} from "./AB_Utils.js";
import {ScoreboardClicker, ScoreboardDemineur, ScoreboardTowerDefense} from "./Scoreboard.js";
import {VolumeDemineur} from "./Volume.js";
import SearchUtils from "./SearchUtils.js";
import { resetDemineur } from "../games/demineur/js/main.js";

function init(){
    //Create footer - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    AB_Utils.readTextFile("/AB_AW_G10/component/footer.html", (text) =>{
        AB_Utils.replaceComponent("footer",text);
    });

    //Create navbar - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    AB_Utils.readTextFile("/AB_AW_G10/component/navbar.html", (text) =>{
        AB_Utils.replaceComponent("nav",text);
        updateNavbar();
    });

    //Create scoreboard - - - - - - - - - - - - - - - - - - - - - - - - - -
    const scoreboardElement = document.getElementById("scoreboard");
    if (scoreboardElement){
        AB_Utils.readTextFile("/AB_AW_G10/component/scoreboard.html", (text) =>{
            AB_Utils.replaceComponent("scoreboard",text, function (completed) {
                if (completed){
                    switch(window.location.pathname.split("/")[3]) {
                        case "demineur":
                            ScoreboardDemineur.displayFacile();
                            break;
                        case "clicker":
                            ScoreboardClicker.displayScore();
                            break;
                        case "towerDefense":
                            ScoreboardTowerDefense.displayScore();
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
            const volume = volumeElement.value/100;
            switch(window.location.pathname.split("/")[3]) {
                case "demineur":
                    VolumeDemineur.updateVolume(volume);
            }
        });
    }

    //Create mute button - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    let mute = false;
    const volumeToggle = document.getElementById("toggle_volume");
    if (volumeToggle) {
        volumeToggle.addEventListener('click', function(){
            switch(window.location.pathname.split("/")[3]) {
                case "demineur":
                    VolumeDemineur.mute();
            }
        });
    }


    //Create reset button - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    const resetButton = document.getElementById("resetGame");
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            switch(window.location.pathname.split("/")[3]) {
                case "demineur":
                    resetDemineur();
                //TODO Ajouter les resets des autres jeux
            }
        });
    }



    //Enable searchBar - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const searchInputElement = document.getElementById("search_input");
    const searchResultElement = document.getElementById("search_results_container")
    if (searchInputElement && searchResultElement){
        searchInputElement.addEventListener("input", function(){
           const value  = searchInputElement.value;
           searchResultElement.innerHTML = '';
           if(value.length > 0) {
               const results = SearchUtils.searchGames(value);
               for (let i = 0; i < results.length; i++){
                   const resultElement = document.createElement("a");
                   resultElement.classList.add("search_result");
                   resultElement.innerHTML = results[i].display_name;
                   resultElement.href = results[i].link;
                   searchResultElement.appendChild(resultElement);
               }
               if (results.length === 0){
                   const resultElement = document.createElement("p");
                   resultElement.classList.add("search_result");
                   resultElement.innerHTML = "Aucun élement";
                   searchResultElement.appendChild(resultElement);
               }
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
    }
}



window.addEventListener('scroll', update);

window.addEventListener('load', function () {
    init();
})

