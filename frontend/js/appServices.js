const SERVER_URL = 'https://abcort.onrender.com';

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

        if (response.ok) {
            return await response.json();
        };
        
        //Handle not ok response
    } catch (error) {
        //Handle not ok response
        console.error(error);
    };
};

const getDefinitionsList = async wordsList => {
    const wordsDefinitionsList = new Array();


    wordsList.forEach(async word => {
        try {
            const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/en/${word.toLowerCase()}`);
        
            const data = await response.json();

            if (data.entries.length === 0) {
                wordsDefinitionsList.push("No meanings available");
            } else {
                wordsDefinitionsList.push(data.entries[0].senses[0].definition);
            };
        } catch (error) {
            console.error(error);
        };
    });

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
                currentGameState
            })
        });

        if (response.ok) {
            return await response.json();
        };

        //Handle not ok response
        
    } catch (error) {
        console.error(error);
        //Handle not ok response
    }
};


export {
    getWordsList, getResult, getDefinitionsList
};