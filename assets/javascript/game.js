var wordBank = ["tiger", "lion", "zebra", "monkey", "giraffe"];

var wins = 0;

var lettersGuessed = "";

var restartGame = false;

var currentWord;

var guessesRemaining;

var msg = "";

// calls function to begin first game 
NewGame();

//begins a new game
function NewGame() {

	restartGame = false;

	// Choose random word to be guessed
	currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];

	console.log(currentWord);

	// Set the number of guesses remaining
	guessesRemaining = currentWord.length + 5;

	// Clear the letters guessed
	lettersGuessed = "";	

	//resets message to nothing
	msg = "";

	updateGame();
}


//records the keypress and sets it to currentletterguessed
document.onkeyup = function(event) {
	
	if (restartGame) {
	NewGame();
	return;
	}

	var currentLetterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	// require that key pressed is a letter
	if (!(currentLetterGuessed.match(/[a-z]/i))) { 
	msg = "<p>Invalid Selection</p>";
	} 
	// else, says letter has already been seleted
	else if (lettersGuessed.indexOf(currentLetterGuessed) > -1) {
	msg = "<p>You already guessed that letter. Guess Again!</p>";
	}
	// otherwise, the letter is a valid guess
	else {
	// Check if the letter is in word. Lose a life if incorrect.
	if (currentWord.indexOf(currentLetterGuessed) < 0) {
	msg = "<p>Incorrect! Guess again!</p>";	
	guessesRemaining--;
	}
	else {
	msg = "<p>Correct! You are one letter closer!</p>";	
	}
	
	lettersGuessed = lettersGuessed + currentLetterGuessed;
	}

	updateGame();
	
}


function updateGame() {

	var hangmanWord = getHangmanWord(lettersGuessed);	

	//text
	var html = 
	"<p>Press any letter to begin!</p>" +
	"<p>Letters already guessed: " + lettersGuessed + "</p>" +
	"<p>" + hangmanWord + "</p>" +
	"<p>Number of guesses remaining: " + guessesRemaining + "</p>" +
	msg;

	// Check if player won
	if (hangmanWord.indexOf("_") < 0) {
	wins++;
	html = 
	"<p>" + hangmanWord + "</p>" + 
	"<p>You win! Press any key to start a new game.</p>" +
	"<p>Number of Wins: " + wins;
	restartGame = true;
	} 
	// Check if player lost
	else if (guessesRemaining < 1) {
	html = 
	"<p>Letters already guessed: " + lettersGuessed + "</p>" +
	"<p>The word was: " + currentWord + "</p>" +
	"<p>Game Over! Press any key to start a new game.</p>";
	restartGame = true;
	}
	// Otherwise, keep going
	else {
	html = html + "<p>Select a new letter to continue.</p>";
	}

	// Placing the html into the game ID
	document.querySelector("#game").innerHTML = html;
}


function getHangmanWord(lettersGuessed) {
	
	var hangmanWord = "";

	// Iterate over all the letters in the current word
	for (i = 0; i < currentWord.length; i++) {
	var currentWordLetter = currentWord[i];

	// If the current word letter is in the string of letters guessed
	if (lettersGuessed.indexOf(currentWordLetter) > -1 ) {
	hangmanWord = hangmanWord + currentWordLetter;
	}
	// else the letter hasn't been guessed so add a dash
	else {
	hangmanWord = hangmanWord + "_ ";
	}
	}
	
	return hangmanWord;
}