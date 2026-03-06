import * as domElements from './domElements.js';
import * as render from './render.js';
import * as functions from './functions.js';
import * as fire from './fire.js';
import * as audio from './audio.js';
import * as game from './game.js';

const playerStatus = functions.setPlayerStatus();

render.printPlayerStatus(playerStatus);

fire.startFire();

document.addEventListener('click', () => {
    render.hideConnectionFailedModal();
});

domElements.startGameBtns.forEach(button => {
    button.addEventListener('click', () => game.startGame())
});

domElements.finishGameBtn.addEventListener('click', () => {
    game.finishGame({ defeatByTimeout: false });
});

domElements.goHomeBtn.addEventListener('click', () => {
    functions.goHome();
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        functions.finishGame({ defeatByTimeout: false });
    };
});

domElements.wordsListArea.addEventListener('mousemove', () => {
    const words = document.querySelectorAll('.word');

    words.forEach(word => word.addEventListener('click', () => {
        functions.showDefinitionHandler(word.id);
    }));

    words.forEach(word => word.addEventListener('mouseenter', () => {
        functions.showDefinitionHandler(word.id);
    }));

    words.forEach(word => word.addEventListener('mouseleave', () => {
        render.hideDefinition();
    }));
});

domElements.playerInputsWrapper.addEventListener('input', () => {
    functions.checkInputValues();
    functions.markWordsHandler();
});

domElements.playerInputsWrapper.addEventListener('paste', event => {
    event.preventDefault();
});

domElements.playAudioBtn.addEventListener('click', () => {
    audio.handlePlayButton();
});

domElements.pauseAudioBtn.addEventListener('click', () => {
    audio.pauseAudios();
});


domElements.buttons.forEach(button => {
    button.addEventListener('click', () => audio.playButtonSound())
})

domElements.gameDifficultySelect.addEventListener('click', () => audio.playButtonSound());

domElements.playAudioBtn.addEventListener('click', () => render.toggleSoundElement());

domElements.pauseAudioBtn.addEventListener('click', () => render.toggleSoundElement());