var randomNumber = Math.floor(Math.random() * 99) + 1;
var guesses = document.querySelector("#guesses");
var lastResult = document.querySelector("#lastResult");
var lowOrHi = document.querySelector("#lowOrHi")

var guessSubmit = document.querySelector(".guessSubmit");
var guessField = document.querySelector(".guessField");
            
var guessCount = 1;
var resetButton = document.querySelector("#reset");
resetButton.style.display = 'none';

var won = document.querySelector("#won");
var lost = document.querySelector("#lost");

var wonAmount = 0;
var lostAmount = 0;

won.innerHTML = 'won: 0';
lost.innerHTML = 'lost: 0';

function checkGuess() {
    var userGuess = Number(guessField.value);
    if (isNaN(userGuess) || userGuess > 99) {
        lowOrHi.innerHTML = 'Invalid input: select an integer between 0 and 99';
        lastResult.innerHTML = 'Invalid input';
        lastResult.style.backgroundColor = 'orange';
    }

    else
    {
        if (guessCount === 1) {
            guesses.innerHTML = 'Previous guesses: ';
        }
        guesses.innerHTML += userGuess + ' ';

        if (userGuess === randomNumber) {
            lastResult.innerHTML = 'Congratulation! You got it right!';
            lastResult.style.backgroundColor = 'green';
            lowOrHi.innerHTML = '';
            wonAmount ++;
            setGameOver();
        } else if (guessCount === 7) {
            lastResult.innerHTML = 'Sorry, you lost!';
            lostAmount ++;
            setGameOver();
        } else {
            lastResult.innerHTML = 'Wrong!';
            lastResult.style.backgroundColor = 'red';
            if (userGuess < randomNumber) {
                lowOrHi.innerHTML = 'Last guess was too low!';
            } else if (userGuess > randomNumber) {
                lowOrHi.innerHTML = 'Last guess was too high!'
            }
        }

        guessCount++;
        guessField.value = '';
        guessField.focus();
    }
    
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    won.innerHTML = 'won: ' + wonAmount;
    lost.innerHTML = 'lost: ' + lostAmount;
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.style.display = 'inline';
    resetButton.addEventListener('click', resetGame)
}

function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.style.display = 'none';
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 99 + 1);


}