const guessedLettersElement = document.querySelector('.guessed-letters');
const button = document.querySelector('.guess');
const textInput = document.querySelector('.letter');
const wordProgress = document.querySelector('.word-in-progress');
const remaining = document.querySelector('.remaining');
const remainingDisplay = document.querySelector('span');
const messages = document.querySelector('.message');
const hiddenButton = document.querySelector('.play-again hide');

const word = 'magnolia';
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

placeholder(word)

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
        console.log(guessedLetters);
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

const checkWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        messages.classList.add('win');
        messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
}