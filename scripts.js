/** Given a word, randomly jumbles the letters */
function shuffleWord(word) {
    word = word.split("");
    let len = word.length;

    for (let i=0; i<len; i++) {
        let j = Math.floor(Math.random() *len);
        let temp = word[i];
        word[i] = word[j];
        word[j] = temp;
    }
    return word;
}
/** Populates the grid with a word */
function fillTarget(word) {
    let gridCells = document.getElementById("grid-container").children;
    for (let i=0; i < word.length; i++) {
        gridCells[i].innerHTML = word[i];
    }  
}

/** Loads a list of words from a file */
function loadWordList(file) {
    return fetch(file)
        .then(response => response.text())
        .then(text => { return text; })
        .catch(error => console.log(error))
}
/** Awaits fetch call before initialising everything */
async function storeWordList() {
    dictionary = await loadWordList("words.txt");
    dictionary = dictionary.split("\r\n");
    targetWordList = await loadWordList("target-words.txt");
    targetWordList = targetWordList.split("\r\n");
    targetWord = targetWordList[Math.floor(Math.random() * targetWordList.length)];
    shuffledWord = shuffleWord(targetWord.toUpperCase());
    fillTarget(shuffledWord);
}
/** Checks if word guess is valid */
function checkWord() {
    var guess = document.getElementById("guess").value.toUpperCase();
    guess = guess.split("");
    var centreLetter = document.getElementById("middle-cell").innerHTML;
    if (!guess.includes(centreLetter)) {
        console.log("Must include center letter");
        return;
    }
    if (guess.length < 4) {
        console.log("Words must be at least 4 letters long")
    }
    for (let i = 0; i < shuffledWord.length; i++) {          
        const index = guess.indexOf(shuffledWord[i]);
        if (index > -1) {
            guess.splice(index, 1);
        }
    }
    if (guess.length == 0) {
        console.log('valid letters used from target');
        if (dictionary.includes(document.getElementById("guess").value)) {
            console.log('appears in dictionary');
        } else {
            console.log("doesn't appear in dictionary")
        }
    } else {
        console.log('invalid letters from target used');
    }
    // if (dictionary.includes(guess)) {
    //     console.log(`${guess} appears in the list!`);
    // }
}

var dictionary;
var targetWordList;
var targetWord;
var shuffledWord;
storeWordList();