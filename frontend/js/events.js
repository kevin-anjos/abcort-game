import * as domElements from './domElements.js';
import * as render from './render.js';
import * as functions from './functions.js';
import * as fire from './fire.js';

const playerStatus = functions.getPlayerStatus();

render.printPlayerStatus(playerStatus);

fire.startFire();

domElements.startGameBtns.forEach(button => {
    button.addEventListener('click', () => functions.startGame())
});

domElements.finishGameBtn.addEventListener('click', () => {
    functions.finishGame({ defeatByTimeout: false });
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

    words.forEach(word => word.addEventListener('mouseenter', () => {
        functions.showDefinitionHandler(word.id);
    }));

    words.forEach(word => word.addEventListener('mouseleave', () => {
        render.hideDefinition();
    }));
});

domElements.playerInputsWrapper.addEventListener('input', () => {
    functions.checkInputValues()
});

domElements.playerInputsWrapper.addEventListener('paste', event => {
    event.preventDefault();
});