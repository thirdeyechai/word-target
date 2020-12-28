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

const targetWord = 'AUTHORITY';
let shuffledWord = shuffleWord(targetWord);
fillTarget(shuffledWord);