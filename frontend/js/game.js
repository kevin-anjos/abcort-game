import * as appServices from './appServices.js';
import * as domElements from './domElements.js';
import * as functions from './functions.js';

const currentGame = {
    playerStatus: null,
    wordsList: null,
    wordsDefinitions: null,
    gameState: null,
};

const startGame = async () => {

    currentGame.playerStatus = functions.setPlayerStatus();

    functions.resetGame();

    functions.pauseGame();

    const { wordsList, gameState } = await appServices.startGame(domElements.gameDifficultySelect.value);

    updateCurrentGame({ wordsList, gameState });

    functions.setupGameUI(wordsList);

    /* STARTED */

    const wordsDefinitions = await appServices.getDefinitionsList(wordsList);

    updateCurrentGame({ wordsDefinitions });
}

const finishGame = async ({ defeatByTimeout }) => {

    const finishGameButtonState = functions.getFinishGameButtonState();

    if (finishGameButtonState.disabled && !defeatByTimeout) return;

    functions.pauseGame();

    const { playerResult, playerStatus, cheated, correctWordsList } = await functions.getGameResult();

    functions.showGameResult({ cheated, defeatByTimeout, playerResult, correctWordsList });

    updateCurrentGame({ playerStatus });

    functions.resetGame();
    
}

const updateCurrentGame = ({ playerStatus, wordsList, wordsDefinitions, gameState }) => {

    if (playerStatus) currentGame.playerStatus = playerStatus;

    if (wordsList) currentGame.wordsList = wordsList;

    if (wordsDefinitions) currentGame.wordsDefinitions = wordsDefinitions;

    if (gameState) currentGame.gameState = gameState;

};

const getCurrentGame = () => currentGame;

export {
    startGame, finishGame, getCurrentGame, updateCurrentGame
}