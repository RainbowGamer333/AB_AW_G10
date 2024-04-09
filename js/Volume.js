class Volume {

}


export class VolumeDemineur extends Volume {
    static init() {
        VolumeDemineur.clickAudio = new Audio("asset/sons/click.mp3");
        VolumeDemineur.zeroAudio = new Audio("asset/sons/zero.mp3");
        VolumeDemineur.placeFlagAudio = new Audio("asset/sons/flag_place.mp3");
        VolumeDemineur.removeFlagAudio = new Audio("asset/sons/flag_remove.mp3");
        VolumeDemineur.gameOverAudio = new Audio("asset/sons/game_over.mp3");
        VolumeDemineur.victoryAudio = new Audio("asset/sons/victory.mp3");
    }

    static updateVolume(value) {
        VolumeDemineur.clickAudio.volume = value/100;
        VolumeDemineur.zeroAudio.volume = value/100;
        VolumeDemineur.placeFlagAudio.volume = value/100;
        VolumeDemineur.removeFlagAudio.volume = value/100;
        VolumeDemineur.gameOverAudio.volume = value/100;
        VolumeDemineur.victoryAudio.volume = value/100;
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