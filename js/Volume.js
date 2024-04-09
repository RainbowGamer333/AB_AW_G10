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
        VolumeDemineur.clickAudio.volume = value;
        VolumeDemineur.zeroAudio.volume = value;
        VolumeDemineur.placeFlagAudio.volume = value;
        VolumeDemineur.removeFlagAudio.volume = value;
        VolumeDemineur.gameOverAudio.volume = value;
        VolumeDemineur.victoryAudio.volume = value;
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