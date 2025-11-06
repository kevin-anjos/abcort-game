import * as render from './render.js';

const SERVER_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:7000'
    : 'https://abcort.onrender.com';

const getWordsList = async gameDifficulty => {
    try {
        const response = await fetch(`${SERVER_URL}/game/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gameDifficulty
            })
        });

        console.log(response.status);

        if (response.ok) {
            return await response.json();
        };
        
        render.showConnectionFailedModal();
    } catch (error) {
        console.error(error);

        render.showConnectionFailedModal();
    };
};

const getDefinitionsList = async wordsList => {

    const wordsDefinitionsList = new Array();

    for (let i = 0; i < wordsList.length; i++) {
        try {
            const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/en/${wordsList[i].toLowerCase()}`);
        
            const data = await response.json();

            if (data.entries.length === 0) {
                wordsDefinitionsList.push("No meanings available");
            } else {
                wordsDefinitionsList.push(data.entries[0].senses[0].definition);
            };
        } catch (error) {
            console.error(error);
        };
    }

    return wordsDefinitionsList;
}

const getResult = async (playerWordsList, playerStatus, currentGameState) => {
    try {
        const response = await fetch(`${SERVER_URL}/game/result`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playerWordsList,
                playerStatus,
                gameState: currentGameState
            })
        });

        if (response.ok) {
            return await response.json();
        };


        render.showConnectionFailedModal();
    } catch (error) {
        render.showConnectionFailedModal();

        console.error(error);
    }
};


export {
    getWordsList, getResult, getDefinitionsList
};