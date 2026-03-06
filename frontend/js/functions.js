import * as appServices from './appServices.js';
import * as domElements from './domElements.js';
import * as render from './render.js';
import * as audio from './audio.js';
import * as game from './game.js';

const finishGameButtonState = {
    disabled: true
};

const setPlayerStatus = () => {
    try {
        const storedPlayerStatus = JSON.parse(localStorage.getItem("playerStatus"));

        const playerStatus = verifyStoredPlayerStatus(storedPlayerStatus);

        return playerStatus;

    } catch (error) {
        return {
            "wins": 0,
            "defeats": 0,
        };
    };
};

let countdown;

const verifyStoredPlayerStatus = storedPlayerStatus => {
    if (isNaN(Number(storedPlayerStatus?.wins)) || isNaN(Number(storedPlayerStatus?.defeats))) return {
        "wins": 0,
        "defeats": 0,
    }

    return storedPlayerStatus;
};

const getPlayerInputsValues = () => {
    const playerInputsValues = [];

    const playerWordInputs = document.querySelectorAll('.word-input');

    playerWordInputs.forEach(input => playerInputsValues.push(input.value));

    return playerInputsValues;
}

const checkInputValues = () => {
    const playerInputsValues = getPlayerInputsValues();

    //Checks if all inputs values exists (are different than an empty string)
    if (playerInputsValues.every(input => input.trim())) {
        finishGameButtonState.disabled = false;
    } else {
        finishGameButtonState.disabled = true;
    };

    render.handleDisabledButtonClass(finishGameButtonState.disabled);
};

const markWordsHandler = () => {
    const playerInputsValues = getPlayerInputsValues().map(word => word.toLowerCase());

    const toBeMarkedWordsPositions = new Array();

    const { wordsList } = game.getCurrentGame();

    //Check if any word list input and play input word match

    //if it does match, save the position in the variable and render the marked word

    wordsList.forEach((word, index) => {
        if (playerInputsValues.includes(word.toLowerCase())) {
            toBeMarkedWordsPositions.push(index);
        };
    });

    render.markCorrectWords(toBeMarkedWordsPositions);
};

const goHome = () => {
    clearInterval(countdown);
    audio.pauseAudios();
    render.showPlayButton();
    render.showGameAreaHandler("start-game-area");
}


const updatePlayerStatus = () => {
    const { playerStatus } = game.getCurrentGame();

    localStorage.setItem("playerStatus", JSON.stringify(playerStatus));
};

const showGameResult = async ({ cheated, defeatByTimeout, playerResult, correctWordsList }) => {

    if (cheated) {
        render.showGameAreaHandler("player-cheated-area");
        audio.playLoserSound();
        return;
    };

    if (defeatByTimeout || !playerResult.won) {
        render.showGameResultArea({ defeat: true });
        render.printCorrectWordsList({ correctWordsList });
        audio.playDefeatSound();
    } 
    
    if (!defeatByTimeout && playerResult.won) {
        render.showGameResultArea({ defeat: false });
        audio.playWinSound();
    };

    render.showGameAreaHandler("result-game-area");

};

const resetGame = () => {

    const { playerStatus } = game.getCurrentGame();

    render.showPlayButton();

    updatePlayerStatus();

    clearInterval(countdown);

    finishGameButtonState.disabled = true;

    render.printPlayerStatus(playerStatus);

    render.handleDisabledButtonClass(finishGameButtonState.disabled);

    render.resetGameElements();

};

const printTimeLeftHandler = (timeIterator) => {
    render.printTimeLeft(timeIterator);

    countdown = setInterval(() => {
        if (timeIterator === 1) {
            clearInterval(countdown);
            game.finishGame({ defeatByTimeout: true });
        };

        timeIterator--;

        render.printTimeLeft(timeIterator);
        
    }, 1000);
};

const setGameDificulty = () => {
    const gameDifficulty = domElements.gameDifficultySelect.value;

    const timePerDifficulty = {
        "easy-mode": 120,
        "medium-mode": 90,
        "hard-mode": 70
    };

    return timePerDifficulty[gameDifficulty];
};

const showDefinitionHandler = word => {

    const { wordsDefinitions } = game.getCurrentGame();

    if (!wordsDefinitions) return;

    const wordId = word.replace('word-', '');

    const wordDefinition = wordsDefinitions[wordId];

    render.showDefinition(wordDefinition);

};

const pauseGame = () => {
    audio.pauseAudios();
    render.showLoadingScreen();
};

const getGameResult = async () => {

    const playerWordsList = getPlayerInputsValues();

    const {gameState, playerStatus} = game.getCurrentGame();

    const result = await appServices.finishGame({
        playerStatus,
        gameState,
        playerWordsList
    });

    game.updateCurrentGame({ 
        playerStatus: result.playerStatus
    });

    return result;
};

const setupGameUI = wordsList => {
    render.printWordList(wordsList);
    
    render.printPlayerInputs(wordsList);
    
    render.showGameAreaHandler("play-game-area");

    printTimeLeftHandler(setGameDificulty());

    audio.playCountdownSound();

    render.showPauseButton();
};

const getFinishGameButtonState = () => finishGameButtonState

export {
    goHome, checkInputValues, setGameDificulty, showDefinitionHandler, markWordsHandler, setPlayerStatus, setupGameUI, getGameResult, pauseGame, resetGame, showGameResult, getFinishGameButtonState, getPlayerInputsValues
};