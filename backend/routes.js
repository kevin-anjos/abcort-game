import express from 'express';
import * as objectTables from './objectTables.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/start', async(req, res) => {

    const { gameDifficulty } = req.body;
    
    const wordsAmount = objectTables.wordsAmountPerDifficulty[gameDifficulty];

    const randomIndex = Math.floor(Math.random() * 25);

    const letter = objectTables.letterPerIndex[randomIndex];

    try {

        const response = await fetch(`https://random-word-api.vercel.app/api?words=${wordsAmount}&letter=${letter.toLowerCase()}&type=capitalized`);

        const wordsList = await response.json();

        const gameTimeInMilliseconds = objectTables.timePerDifficultyInMilliseconds[gameDifficulty];

        //Pass the game state to the front-end;

        const gameState = jwt.sign(
            {
                gameDifficulty: gameDifficulty,
                wordsList: wordsList,
                gameStartedTime: Date.now()

            }, 
            process.env.JWT_SECRET, 
            { expiresIn: `${(gameTimeInMilliseconds / 1000) + 5}s` }
        )
        
        res.status(200).json({
            wordsList: wordsList,
            gameState: gameState,
        });


    } catch (error) {
        console.error(error);
        res.status(500);
    };
    
});

router.post('/result', async(req, res) => {

    const { playerWordsList, playerStatus, currentGameState } = req.body;

    if (!currentGameState) {
        return res.status(400).json("The state of the game was not disclosed.");
    };

    try {
        const { gameDifficulty, wordsList, gameStartedTime } = jwt.verify(currentGameState, process.env.JWT_SECRET);

        //The game state is valid

        //Check if the time is valid

        const gameFinishedTime = Date.now();

        const gameTimeInMilliseconds = objectTables.timePerDifficultyInMilliseconds[gameDifficulty];

        if (gameFinishedTime - gameStartedTime > gameTimeInMilliseconds) {

            playerStatus.defeats++

            return res.status(200).json({
                playerResult: {
                    won: false
                },
                playerStatus
            });

        } 

        //The time is valid

        //Verify the words list

        const lowerCasedOriginalWordsList = wordsList.sort().map(word => word.toLowerCase());

        const lowerCasedPlayerWordsList = playerWordsList.map(word => word.toLowerCase());

        if (JSON.stringify(lowerCasedOriginalWordsList) !== JSON.stringify(lowerCasedPlayerWordsList)) {
            playerStatus.defeats++
            return res.status(200).json({
                playerResult: {
                    won: false
                },
                playerStatus
            });
        };

        playerStatus.wins++
        res.status(200).json({
            playerResult: {
                won: true
            },
            playerStatus
        });
        
    } catch (error) {
        playerStatus.defeats = playerStatus.defeats + 1000;

        res.status(200).json({
            playerResult: {
                won: false
            },
            cheated: true,
            playerStatus
        });
    };

});

export default router;