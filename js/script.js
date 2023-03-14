const guessedLettersElement = document.querySelector('.guessed-letters');
const button = document.querySelector('.guess');
const textInput = document.querySelector('.letter');
const wordProgress = document.querySelector('.word-in-progress');
const remaining = document.querySelector('.remaining');
const remainingDisplay = document.querySelector('span');
const messages = document.querySelector('.message');
const hiddenButton = document.querySelector('.play-again');

let word = 'magnolia';
let guessedLetters = [];
let remainingGuesses = 8


const getWord = async function () {
    const res = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};



button.addEventListener('click', function (e) {
    e.preventDefault();
    messages.innerText = '';
    const input = textInput.value;
    const goodGuess = validateInput(input);
    if (goodGuess) {
        makeGuess(input);
    }
    textInput.value = '';
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        messages.innerText = 'Please input a letter';
    } else if (input.length > 1) {
        messages.innerText = 'Please enter only ONE letter';
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = 'Sorry, you need to enter a letter from A-Z.';
    } else {
        return input;
    }
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messages.innerText = 'You already guessed that letter! Try again!';
    } else {
        guessedLetters.push(letter);
        guessCount(letter)
        guessedLetterUpdate();
        updateWIP(guessedLetters)
    }
};

const guessedLetterUpdate = function () {
    guessedLettersElement.innerHTML = '';
    for (const letter of guessedLetters) {
        const li = document.createElement('li');
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWIP = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split('');
    const wordReveal = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            wordReveal.push(letter.toUpperCase())
        } else {
            wordReveal.push('●');
        }
    }
    wordProgress.innerText = wordReveal.join('');
    checkWin();
};

const guessCount = function (guess) {
    const upWord = word.toUpperCase();
    if (!upWord.includes(guess)) {
        messages.innerText = `Sorry! That word does not include ${guess}! Try again.`
        remainingGuesses -= 1;
    } else {
        messages.innerText = `The letter ${guess} is, indeed, in the word.`
    }

    if (remainingGuesses === 0) {
        messages.innerHTML = `Womp Womp! GAME OVER! The word was <span class="highlight">${upWord}</span>!`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingDisplay.innerText = `${remainingGuesses} guess`;
    } else {
        remainingDisplay.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        messages.classList.add('win');
        messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
}

const startOver = function () {
    button.classList.add('hide');
    remaining.classList.add('hide');
    guessedLettersElement.classList.add('hide');
    hiddenButton.classList.remove('hide');
}

hiddenButton.addEventListener('click', function () {
    messages.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingDisplay.innerText = `${remainingGuesses} guesses`
    guessedLettersElement.innerHTML = '';
    messages.innerText = '';

    getWord();

    button.classList.remove('hide');
    hiddenButton.classList.add('hide');
    remaining.classList.remove('hide');
    guessedLettersElement.classList.remove('hide');
});