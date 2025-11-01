const letterPerIndex = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
  8: 'I',
  9: 'J',
  10: 'K',
  11: 'L',
  12: 'M',
  13: 'N',
  14: 'O',
  15: 'P',
  16: 'Q',
  17: 'R',
  18: 'S',
  19: 'T',
  20: 'U',
  21: 'V',
  22: 'W',
  23: 'Y',
  24: 'Z'
};

const wordsAmountPerDifficulty = {
  "easy-mode": 5,
  "medium-mode": 8,
  "hard-mode": 10    
};

const timePerDifficultyInMilliseconds = {
  "easy-mode": 120000,
  "medium-mode": 90000,
  "hard-mode": 70000
};

export {
  letterPerIndex, wordsAmountPerDifficulty, timePerDifficultyInMilliseconds
};