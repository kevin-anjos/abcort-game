
const header = document.querySelector('header');

const playerInputsWrapper = document.querySelector('#player-inputs-wrapper');

const wordsListArea = document.querySelector('#words-list-area #words');

const finishGameBtn = document.querySelector('#finish-game-btn');
const startGameBtns = document.querySelectorAll('.start-game-btn');
const goHomeBtn = document.querySelector('#go-home-btn');

const playerResultAreas = document.querySelectorAll('.player-result-area-wrapper');

const startGameArea = document.querySelector('#start-game-area');
const gameArea = document.querySelector('#game-area');
const resultGameArea = document.querySelector('#result-game-area');
const playerCheatedArea = document.querySelector('#player-cheated-area');

const connectionFailedModal = document.querySelector('#connection-failed-modal');
const loadingScreen = document.querySelector('#loading-screen');

const playerWinsSpan = document.querySelector('#player-wins-span');
const playerDefeatsSpan = document.querySelector('#player-defeats-span');

const gameTimer = document.querySelector('#game-timer');
const timerCountdownSpan = document.querySelector('#timer-countdown-span');

const gameDifficultyConfiguration = document.querySelector('#game-difficulty-configuration');
const gameDifficultySelect = document.querySelector('#game-difficulty-select');

const wordDefinitionArea = document.querySelector('#definitions-area');

const footer = document.querySelector('footer');

const fireSound = document.querySelector('#fire-sound');
const countdownSound = document.querySelector('#countdown-sound');
const buttonSound = document.querySelector('#button-sound');
const winSound = document.querySelector('#win-sound');
const defeatSound = document.querySelector('#defeat-sound');
const loserSound = document.querySelector('#loser-sound');

const playAudioBtn = document.querySelector('#play-audio-btn');
const pauseAudioBtn = document.querySelector('#pause-audio-btn');

const buttons = document.querySelectorAll('button');

export {
    wordsListArea, finishGameBtn, startGameBtns, playerInputsWrapper, playerResultAreas, startGameArea, gameArea, resultGameArea, loadingScreen, playerDefeatsSpan, playerWinsSpan, gameTimer, timerCountdownSpan, goHomeBtn, gameDifficultyConfiguration, gameDifficultySelect, header, footer, wordDefinitionArea, playerCheatedArea, connectionFailedModal, fireSound, countdownSound, buttonSound, playAudioBtn, pauseAudioBtn, buttons, winSound, defeatSound, loserSound
}