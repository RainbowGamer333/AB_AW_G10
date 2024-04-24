const volumeToggle = document.getElementById("toggle_volume");
const volumeRange = document.getElementById("volume_range");

class Volume {

}


export class VolumeDemineur extends Volume {
    static _mute = false;
    static _value;

    static init() {
        VolumeDemineur._value = 0.5;
        VolumeDemineur.clickAudio = new Audio("asset/sons/click.mp3");
        VolumeDemineur.zeroAudio = new Audio("asset/sons/zero.mp3");
        VolumeDemineur.placeFlagAudio = new Audio("asset/sons/flag_place.mp3");
        VolumeDemineur.removeFlagAudio = new Audio("asset/sons/flag_remove.mp3");
        VolumeDemineur.gameOverAudio = new Audio("asset/sons/game_over.mp3");
        VolumeDemineur.victoryAudio = new Audio("asset/sons/victory.mp3");
    }

    static updateVolume(value) {
        VolumeDemineur._value = value;
        VolumeDemineur.clickAudio.volume = value;
        VolumeDemineur.zeroAudio.volume = value;
        VolumeDemineur.placeFlagAudio.volume = value;
        VolumeDemineur.removeFlagAudio.volume = value;
        VolumeDemineur.gameOverAudio.volume = value;
        VolumeDemineur.victoryAudio.volume = value;
    }

    static muteVolume() {
        VolumeDemineur.clickAudio.volume = 0;
        VolumeDemineur.zeroAudio.volume = 0;
        VolumeDemineur.placeFlagAudio.volume = 0;
        VolumeDemineur.removeFlagAudio.volume = 0;
        VolumeDemineur.gameOverAudio.volume = 0;
        VolumeDemineur.victoryAudio.volume = 0;
    }

    static mute() {
        if (VolumeDemineur._mute) {
            VolumeDemineur.updateVolume(VolumeDemineur._value);
            VolumeDemineur._mute = false;
            volumeToggle.style.backgroundImage = "url('/AB_AW_G10/asset/icons/volume.png')";
            volumeRange.value = VolumeDemineur._value * 100;
        } else {
            VolumeDemineur.muteVolume();
            VolumeDemineur._mute = true;
            volumeToggle.style.backgroundImage = "url('/AB_AW_G10/asset/icons/mute.png')";
            volumeRange.value = 0;
        }

    }

    static playClick() {
        VolumeDemineur.clickAudio.play();
    }

    static playZero() {
        VolumeDemineur.zeroAudio.play();
    }

    static playPlaceFlag() {
        VolumeDemineur.placeFlagAudio.play();
    }

    static playRemoveFlag() {
        VolumeDemineur.removeFlagAudio.play();
    }

    static playGameOver() {
        VolumeDemineur.gameOverAudio.play();
    }

    static playVictory() {
        VolumeDemineur.victoryAudio.play();
    }

}