/** Given a word, randomly jumbles the letters */
function shuffleWord(word) {
    let charArr = word.split("");
    let len = word.length;

    for (let i=0; i<len; i++) {
        let j = Math.floor(Math.random() *len);
        let temp = charArr[i];
        charArr[i] = charArr[j];
        charArr[j] = temp;
    }
    return charArr;
}
/** Populates the grid with a word */
function fillTarget(word) {
    let gridCells = document.getElementById("grid-container").children;
    for (let i=0; i < word.length; i++) {
        gridCells[i].innerHTML = word[i];
    }  
}

/** Loads the list of 9 letter words */
function loadWordList(file) {
    return fetch(file)
        .then(response => response.text())
        .then(text => { return text; })
        .catch(error => console.log(error))
}
/** Awaits fetch call before initialising everything */
async function storeWordList() {
    wordList = await loadWordList("words.txt");
    wordList = wordList.split("\r\n");
    targetWord = wordList[Math.floor(Math.random() * wordList.length)];
    shuffledWord = shuffleWord(targetWord.toUpperCase());
    fillTarget(shuffledWord);
}

var wordList;
var targetWord;
var shuffledWord;
storeWordList();