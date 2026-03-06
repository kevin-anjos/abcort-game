const getWordsList = async ({ wordsAmount }) => {
    try {
        const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${wordsAmount}`);

        const APIwordsList = await response.json();
        
        const { wordsList, error } = await checkRepeatedWords(APIwordsList);

        return {
            wordsList,
            error
        }
    } catch (error) {
        console.log('Response 0')
        return {
            error
        }
    };
};

const checkRepeatedWords = async wordsList => {
    //Remove repeated words and turns it into an array
    const newWordsList = [...new Set(wordsList)];

    //Compare the length of the given array and the unique array, return the array in case it already has the game length
    if (wordsList.length === newWordsList.length) return { wordsList };

    const repeatingWordsAmount = wordsList.length - newWordsList.length;

    const [ letter ] = wordsList[0].toLowerCase();

    try {
        const response = await fetch(`https://random-word-api.vercel.app/api?words=${repeatingWordsAmount}&letter=${letter}&type=capitalized`);
     
        const words = await response.json();
        
        newWordsList.push(...words);

        return checkRepeatedWords(newWordsList);

    } catch (error) {
        console.log('Response 1')
        return {
            error,
            wordsList
        };
    };

}; 

export {
    getWordsList
}