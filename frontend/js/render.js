import * as domElements from './domElements.js';

const showLoadingScreen = () => {
    domElements.header.classList.add("hidden");
    domElements.startGameArea.classList.add('hidden');
    domElements.gameArea.classList.add('hidden');
    domElements.resultGameArea.classList.add('hidden');
    domElements.footer.classList.add('hidden');
    domElements.loadingScreen.classList.remove('hidden');
}

const printWordList = (wordsList) => {
    wordsList.forEach((word, index) => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');

        wordElement.id = `word-${index}`;

        wordElement.textContent = word;
    
        domElements.wordsListArea.appendChild(wordElement);
    });
};

const printPlayerInputs = (wordsList) => {
    wordsList.forEach((word, index) => {
        const wordInputDiv = document.createElement('div');
        wordInputDiv.classList.add('input');

        const indexParagraph = document.createElement('p');
        indexParagraph.textContent = index + 1 + ".";

        const wordInput = document.createElement('input');
        wordInput.classList.add('word-input');

        wordInputDiv.appendChild(indexParagraph);
        wordInputDiv.appendChild(wordInput);

        domElements.playerInputsWrapper.appendChild(wordInputDiv);
    });
};

const printPlayerStatus = playerStatus => {
    domElements.playerWinsSpan.textContent = playerStatus.wins;

    domElements.playerDefeatsSpan.textContent = playerStatus.defeats;
};

const showGameAreaHandler = gameArea => {
    showLoadingScreen();

    const tobeShowedGameAreas = {
        "start-game-area": showStartGameArea,
        "play-game-area": showPlayGameArea,
        "result-game-area": showResultGameArea,
        "player-cheated-area": showPlayerCheatedArea
    };

    const showGameArea = tobeShowedGameAreas[gameArea];

    showGameArea();

    domElements.loadingScreen.classList.add('hidden');
    domElements.header.classList.remove('hidden');
};

const showStartGameArea = () => {
    domElements.startGameBtns.forEach(button => {
        if (button.classList.contains('header')) {
            button.classList.remove('hidden');
        };
    });

    domElements.gameTimer.classList.add('hidden');

    domElements.startGameArea.classList.remove('hidden');

    domElements.goHomeBtn.classList.add('hidden');

    domElements.gameArea.classList.add('hidden');

    domElements.playerCheatedArea.classList.add('hidden');

    domElements.gameDifficultyConfiguration.classList.remove('hidden');

    domElements.footer.classList.remove('hidden');
};

const showPlayGameArea = () => {
    domElements.startGameBtns.forEach(button => {
        if (button.classList.contains('header')) {
                button.classList.add('hidden');
            };
        });

    domElements.gameTimer.classList.remove('hidden');

    domElements.gameArea.classList.remove('hidden');

    domElements.goHomeBtn.classList.remove('hidden');

    domElements.playerCheatedArea.classList.add('hidden');

    domElements.gameDifficultyConfiguration.classList.add('hidden');
};

const showResultGameArea = () => {
    domElements.resultGameArea.classList.remove('hidden');

    domElements.playerCheatedArea.classList.add('hidden');

    domElements.gameTimer.classList.add('hidden');

    domElements.footer.classList.remove('hidden');
};

const showPlayerCheatedArea = () => {

    domElements.startGameBtns.forEach(button => {
        if (button.classList.contains('header')) {
            button.classList.remove('hidden');
        };
    });

    domElements.gameTimer.classList.add('hidden');

    domElements.startGameArea.classList.add('hidden');

    domElements.resultGameArea.classList.add('hidden');

    domElements.playerCheatedArea.classList.remove('hidden');

    domElements.goHomeBtn.classList.add('hidden');

    domElements.gameDifficultyConfiguration.classList.remove('hidden');

    domElements.footer.classList.remove('hidden');
};

const showGameResultArea = ({ defeat }) => {

    if (!defeat) {
        domElements.playerResultAreas[0].classList.remove('hidden');
        domElements.playerResultAreas[1].classList.add('hidden');
    } else {
        domElements.playerResultAreas[0].classList.add('hidden');
        domElements.playerResultAreas[1].classList.remove('hidden');
    }

};

const handleDisabledButtonClass = (isDisabled) => {
    if (isDisabled) {
        return domElements.finishGameBtn.classList.add('disabled');
    }

    domElements.finishGameBtn.classList.remove('disabled');
};

const resetGameElements = () => {
    domElements.wordsListArea.replaceChildren();
    domElements.playerInputsWrapper.replaceChildren();
    domElements.gameTimer.classList.remove('hidden');
    domElements.startGameBtns.forEach(button => button.innerHTML = '<i class="bi bi-arrow-clockwise"></i> <span>Restart the game</span>')
}

const printTimeLeft = timeLeft => {
    domElements.timerCountdownSpan.innerHTML = `<strong>${("000" + timeLeft).slice(-3)}s</strong>`;
};

const showDefinition = definition => {
    domElements.wordDefinitionArea.replaceChildren();
    
    const h2 = document.createElement('h2');

    h2.textContent = "Definition:"

    const definitionAreaParagraph = document.createElement('p');

    definitionAreaParagraph.textContent = definition;

    domElements.wordDefinitionArea.appendChild(h2);

    domElements.wordDefinitionArea.appendChild(definitionAreaParagraph);

    domElements.wordDefinitionArea.classList.add('show');
}

const hideDefinition = () => {
    domElements.wordDefinitionArea.classList.remove('show');
};

export {
    showLoadingScreen, printPlayerInputs, printWordList, printPlayerStatus, showGameAreaHandler, showGameResultArea, handleDisabledButtonClass, resetGameElements, printTimeLeft, showDefinition, hideDefinition
}