const getWordsList = async ({ wordsAmount, letter }) => {
    try {
        const response = await fetch(`https://random-word-api.vercel.app/api?words=${wordsAmount}&letter=${letter.toLowerCase()}&type=capitalized`);

        const APIwordsList = await response.json();

        const { wordsList, error } = await checkRepeatedWords(APIwordsList);

        return {
            wordsList,
            error
        }
    } catch (error) {
        return {
            error
        }
    };
};

const checkRepeatedWords = async wordsList => {
    //Remove repeated words and turns it into an array
    const newWordsList = [...new Set(wordsList)];

    //Compare the length of the given array and the unique arrray, return the array in case it alrady has the game length
    if (wordsList.length === newWordsList.length) return { wordsList };

    const repeatingWordsAmount = wordsList.length - newWordsList.length;

    const [ letter ] = wordsList[0].toLowerCase();

    try {

        const response = await fetch(`https://random-word-api.vercel.app/api?words=${repeatingWordsAmount}&letter=${letter}&type=capitalized`);

        const words = await response.json();

        newWordsList.push(...words);

        return checkRepeatedWords(newWordsList);

    } catch (error) {
        return {
            error,
            wordsList
        };
    };

}; 

export {
    getWordsList
}