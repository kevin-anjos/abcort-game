import * as appServices from './appServices.js';
import * as domElements from './domElements.js';
import * as render from './render.js';

const finishGameButtonState = {
    disabled: true
};

const setPlayerStatus = () => {

    const playerStatus = JSON.parse(localStorage.getItem("playerStatus"));

    if (!playerStatus) return {
        "wins": 0,
        "defeats": 0,
    }

    if (playerStatus.wins === null || playerStatus.defeats === null) return {
        "wins": 0,
        "defeats": 0,
    }

    if (isNaN(Number(playerStatus.wins)) || isNaN(Number(playerStatus.defeats))) return {
        "wins": 0,
        "defeats": 0,
    }

    return playerStatus;

};

let currentPlayerStatus = setPlayerStatus();

console.log(currentPlayerStatus)

let countdown;

let currentWordsDefinitions;

let currentGameState;

const getPlayerInputsValues = () => {
    const playerInputsValues = [];

    const playerWordInputs = document.querySelectorAll('.word-input');

    playerWordInputs.forEach(input => playerInputsValues.push(input.value));

    return playerInputsValues;
}

const checkInputValues = () => {
    const playerInputsValues = getPlayerInputsValues();

    //Checks if all inputs values are different than an empty string
    if (playerInputsValues.every(input => input.trim() !== "")) {
        finishGameButtonState.disabled = false;
    } else {
        finishGameButtonState.disabled = true;
    };

    render.handleDisabledButtonClass(finishGameButtonState.disabled);
};

const goHome = () => {
    clearInterval(countdown);
    render.showGameAreaHandler("start-game-area");
}

const startGame = async () => {

    clearInterval(countdown);

    render.showLoadingScreen();

    render.resetGameElements();

    const { wordsList, gameState } = await appServices.getWordsList(domElements.gameDifficultySelect.value);

    currentGameState = gameState;

    render.printWordList(wordsList);

    render.printPlayerInputs(wordsList);
    
    render.showGameAreaHandler("play-game-area");

    const timeLeft = setGameDificulty();

    printTimeLeftHandler(timeLeft);

    //Game started

    //Get words definition list after the game starts

    const wordsDefinitions = await appServices.getDefinitionsList(wordsList);

    currentWordsDefinitions = wordsDefinitions;
}

const updatePlayerStatus = () => {
    localStorage.setItem("playerStatus", JSON.stringify(currentPlayerStatus));
}

const finishGame = async ({ defeatByTimeout }) => {

    if (finishGameButtonState.disabled && !defeatByTimeout) return;

    render.showLoadingScreen();

    const playerInputsValues = getPlayerInputsValues();

    const { playerResult, playerStatus, cheated } = await appServices.getResult(playerInputsValues, currentPlayerStatus, currentGameState);

    currentPlayerStatus = playerStatus;

    if (cheated) {
        render.showGameAreaHandler("player-cheated-area");
    } else {
        
        if (defeatByTimeout || !playerResult.won) {
            render.showGameResultArea({ defeat: true });
        } 
        
        if (!defeatByTimeout && playerResult.won) {
            render.showGameResultArea({ defeat: false });
        };

        render.showGameAreaHandler("result-game-area");
    }

    updatePlayerStatus();

    clearInterval(countdown);

    finishGameButtonState.disabled = true;

    console.log(currentPlayerStatus);

    render.printPlayerStatus(currentPlayerStatus);

    render.handleDisabledButtonClass(finishGameButtonState.disabled);

}

const printTimeLeftHandler = (timeIterator) => {
    render.printTimeLeft(timeIterator);

    countdown = setInterval(() => {
        if (timeIterator === 1) {
            clearInterval(countdown);
            finishGame({ defeatByTimeout: true });
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

    if (!currentWordsDefinitions) return;

    const wordId = word.replace('word-', '');

    const wordDefinition = currentWordsDefinitions[wordId];

    render.showDefinition(wordDefinition);

};

const getPlayerStatus = () => currentPlayerStatus;

updatePlayerStatus();

export {
    startGame, goHome, finishGame, checkInputValues, setGameDificulty, getPlayerStatus, showDefinitionHandler
};