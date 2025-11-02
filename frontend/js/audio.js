import * as domElements from './domElements.js';

const handlePlayButton = () => {
    const gameAreasArray = [domElements.startGameArea, domElements.gameArea, domElements.resultGameArea];
    
    const showingGameArea = gameAreasArray.find(area => !area.classList.contains('hidden'));

    const audioPerArea = {
        "start-game-area": playFireSound,
        "game-area": playCountdownSound,
        "result-game-area": playFireSound,
        "player-cheated-area": playFireSound
    };

    const playAudio = audioPerArea[showingGameArea.id];

    playAudio();
};

const pauseAudios = () => {
    domElements.fireSound.pause();
    domElements.countdownSound.pause();
    domElements.loserSound.pause();
}; 

const playFireSound = () => {
    domElements.fireSound.play();
};

const playCountdownSound = () => {
    domElements.countdownSound.play();
};

const playButtonSound = () => {
    domElements.buttonSound.play();
};

const playWinSound = () => {
    domElements.winSound.play();
};

const playDefeatSound = () => {
    domElements.defeatSound.play();
};

const playLoserSound = () => {
    domElements.loserSound.play();
};

export {
    handlePlayButton, pauseAudios, playButtonSound, playCountdownSound, playWinSound, playDefeatSound, playLoserSound
};