"use strict";

/** Given a word, randomly jumbles the letters */
function shuffleWord(word) {
    word = word.split("");  
    for (let i=0; i<word.length; i++) {
        let j = Math.floor(Math.random() *word.length);
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
    // Iterate through guess and remove a letter each time it appears in the target
    for (let i = 0; i < shuffledWord.length; i++) {          
        const index = guess.indexOf(shuffledWord[i]);
        if (index > -1) {
            guess.splice(index, 1);
        }
    }
    // Valid guesses will have had all letters removed from them
    if (guess.length == 0) {
        console.log('valid letters used from target');
        let validWord = document.getElementById("guess").value;
        if (dictionary.includes(validWord)) {
            console.log('appears in dictionary');
            if (guesses.has(validWord.toUpperCase())) {
                console.log('already guessed that word');
            } else {
                guesses.add(document.getElementById("guess").value.toUpperCase());
                addWordToList(document.getElementById("guess").value.toUpperCase());
            }
            document.getElementById("guess").value = '';
        } else {
            console.log("doesn't appear in dictionary")
        }
    } else {
        console.log('invalid letters from target used');
    }
}
// EVENT LISTENERS
document.querySelector("#guess").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#check").click();
    event.preventDefault();
});

/** Adds a word to the list of correctly guessed words */
function addWordToList(word) {
    let ul = document.getElementById("guessed-words");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(word));
    ul.prepend(li);
}
/** Jumbles the target letters to allow the user to view a reshuffled version of the word */
function jumbleLetters() {
    shuffledWord = shuffleWord(shuffledWord.join(''));
    fillTarget(shuffledWord);
    displayError("This is an error");
}
/** Displays errors on screen */
function displayError(message) {
    let err = document.getElementById("errors");
    err.innerHTML = message;

    setInterval(function() { err.innerHTML = ""}, 5000);
}

let dictionary;
let targetWordList;
let targetWord;
let shuffledWord;
let guesses = new Set();

storeWordList();