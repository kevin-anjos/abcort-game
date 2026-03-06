import * as render from './render.js';

const SERVER_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:7000'
    : 'https://abcort.onrender.com';

const doRequest = async ({ endpoint, method, body }) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (body) options.body = JSON.stringify(body);

    try {

        const response = await fetch(endpoint, options);

        if (!response.ok) return render.showConnectionFailedModal();

        return response;

    } catch (error) {
        return render.showConnectionFailedModal();
    };
};

const startGame = async gameDifficulty => {

    const response = await doRequest({
        endpoint: `${SERVER_URL}/game/start`,
        method: "POST",
        body: {
            gameDifficulty
        }
    });

    return await response.json();

};

const getDefinitionsList = async wordsList => {

    const wordsDefinitionsList = new Array();

    for (const word of wordsList) {

        const response = await doRequest({
            endpoint: `https://freedictionaryapi.com/api/v1/entries/en/${word.toLowerCase()}`,
            method: "GET"
        });

        const data = await response.json();

        wordsDefinitionsList.push(data?.entries[0]?.senses[0]?.definition || "No meanings available");

    }

    return wordsDefinitionsList;
}

const finishGame = async ({ playerWordsList, playerStatus, gameState }) => {
    
    const response = await doRequest({
        endpoint: `${SERVER_URL}/game/finish`,
        method: "POST",
        body: {
            playerWordsList,
            playerStatus,
            gameState
        }
    });

    return await response.json();

};


export {
    startGame, finishGame, getDefinitionsList
};