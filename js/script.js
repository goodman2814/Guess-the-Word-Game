const guessedLetters = document.querySelector('.guessed-letters');
const button = document.querySelector('.guess');
const textInput = document.querySelector('.letter');
const wordProgress = document.querySelector('.word-in-progress');
const remaining = document.querySelector('.remaining');
const remainingDisplay = document.querySelector('span');
const messages = document.querySelector('.message');
const hiddenButton = document.querySelector('.play-again hide');

const word = 'magnolia';

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

placeholder(word)

button.addEventListener('click', function (e) {
    e.preventDefault();
    const input = textInput.value;
    console.log(input);
    textInput.value = '';
})
