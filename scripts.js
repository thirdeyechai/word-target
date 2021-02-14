"use strict";
// (function () {

let dictionary;
let targetWordList;
let targetWord;
let shuffledWord;
let guessedWords = new Set();

/** Given a word, randomly jumbles the letters */
function shuffleWord(word) {
    word = word.split("");
    for (let i = 0; i < word.length; i++) {
        let j = Math.floor(Math.random() * word.length);
        let temp = word[i];
        word[i] = word[j];
        word[j] = temp;
    }
    return word;
}
/** Populates the grid with a word */
function fillTarget(word) {
    let gridCells = document.getElementById("grid-container").children;
    for (let i = 0; i < word.length; i++) {
        gridCells[i].innerHTML = word[i];
    }
}

/** Loads a list of words from a file */
async function loadWordList(file) {
    try {
        const response = await fetch(file);
        const text = await response.text();
        return text;
    } catch (error) {
        return console.log(error);
    }
}
/** Awaits fetch call before initialising everything */
async function initializeGame() {
    dictionary = await loadWordList("words.txt");
    dictionary = dictionary.split("\r\n");
    targetWordList = await loadWordList("target-words.txt");
    targetWordList = targetWordList.split("\r\n");
    targetWord = targetWordList[Math.floor(Math.random() * targetWordList.length)];
    shuffledWord = shuffleWord(targetWord.toUpperCase());
    fillTarget(shuffledWord);
    toggleGameWindow();
}
/** Checks if word guess is valid */
function checkWord() {
    var guess = document.getElementById("guess-input").value.toUpperCase();
    guess = guess.split("");

    let cells = document.getElementsByClassName("cell");
    let centreLetter = cells[4].innerHTML;
    if (!guess.includes(centreLetter)) {
        displayError("Must include center letter");
        document.getElementById("guess-input").value = '';
        return;
    }
    if (guess.length < 4) {
        displayError("Words must be at least 4 letters long");
        document.getElementById("guess-input").value = '';
        return;
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
        let validWord = document.getElementById("guess-input").value;
        if (dictionary.includes(validWord.toLowerCase())) {
            if (guessedWords.has(validWord.toUpperCase())) {
                displayError('Word already guessed');
            } else {
                correctChime();
                guessedWords.add(document.getElementById("guess-input").value.toUpperCase());
                addWordToList(document.getElementById("guess-input").value.toUpperCase());
                flashLetters(document.getElementById("guess-input").value);
            }
        } else {
            displayError("Word doesn't appear in dictionary")
        }
    } else {
        displayError('Invalid letters used');
    }
    document.getElementById("guess-input").value = '';
}
// EVENT LISTENERS
document.querySelector("#guess-input").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    document.querySelector("#check").click();
    event.preventDefault();
});

/** Adds a word to the list of correctly guessed words */
function addWordToList(word) {
    let ul = document.getElementById("guessed-words");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(word));
    ul.append(li);
    updateCount();
}
/** Jumbles the target letters to allow the user to view a reshuffled version of the word */
function jumbleLetters() {
    let middleLetter = shuffledWord[4];
    shuffledWord.splice(4, 1); // remove middle letter
    shuffledWord = shuffleWord(shuffledWord.join('')); // shuffle remaining letters
    shuffledWord = shuffledWord.join('');
    shuffledWord = shuffledWord.substring(0, 4) + middleLetter + shuffledWord.substring(4, shuffledWord.length); // add middle letter back
    fillTarget(shuffledWord);
    shuffledWord = shuffledWord.split("");
}
function updateCount() {
    document.getElementById("numberOfWords").innerHTML = guessedWords.size;
}
/** Displays errors on screen */
function displayError(message) {
    let err = document.getElementById("errors");
    err.innerHTML = message;

    setTimeout(function () { err.innerHTML = "" }, 5000);
}
/** Flashes the letters in the target green upon correct guess */
function flashLetters(word) {
    let cells = document.getElementsByClassName("cell");
    word = word.split("");
    let letterPositions = [];

    for (let i = 0; i < shuffledWord.length; i++) {
        if (word.includes(shuffledWord[i].toLowerCase())) {
            if (letterPositions.includes(i)) {
                break;
            } else {
                letterPositions.push(i);
                cells[i].classList.add("flash");
                word.splice(word.indexOf(shuffledWord[i].toLowerCase()), 1);
            }
        }
    }
    setTimeout(function () {
        let cells = document.getElementsByClassName("cell");
        cells = Array.from(cells);
        cells.forEach(cell => {
            cell.classList.remove("flash");
        });
    }, 500);
}
/** Toggles between splash screen and game windows */
function toggleGameWindow() {
    document.getElementById("gamespace").classList.toggle("hidden");
    document.getElementById("splashscreen").classList.toggle("hidden");
}

/** Plays a quick chime upon correct guess */
function correctChime() {
    let chime = new Audio('correct-bleep.wav');
    chime.play();
}

/** Countdown timer  */
function countdown() {
    let seconds = 60;
    function tick() {
        let counter = document.getElementById("timer");
        seconds--;
        counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            alert("Game over");
        }
    }
    tick();
}
// })();