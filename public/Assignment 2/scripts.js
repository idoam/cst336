$(document).ready(function() {

	var isInputOk = false;
	var GuessedAlready = "";
	var Word = "";
	var Letter = "";
	var Lives = 5;
	var DiscoveredLetters;

	$("#SubmitWord").on("click", submitWord);
	$("#SubmitLetter").on("click", submitLetter);
	$("#Hint").on("click", Hint);
	$("#word").on("change", testWord);
	$("#letter").on("change", testLetter);

	function testWord() {
		$("#WordError").html("");
		isInputOk = true;
		var word = $("#word").val().toUpperCase();

		if (word.length < 3) {
			isInputOk = false;
			$("#WordError").html("Word must be of length 3 or more!");
			$("#WordError").css("color", "orange");
		}

		if (word.length > 12) {	
			isInputOk = false;
			$("#WordError").html("Word must be of length 12 or less!");
			$("#WordError").css("color", "orange");
		}

		for (var i = 0; i < word.length; i++){
			if (word[i] < 'A' || word[i] > 'Z') {
				isInputOk = false;
				$("#WordError").html("Word must only contains letters!");
				$("#WordError").css("color", "red");
				break;
			}
		}

		if (isInputOk) {
			Word = word;
		}
	}


	function testLetter() {
		$("#LetterError").html("");
		isInputOk = true;
		var letter = $("#letter").val().toUpperCase();

		if (letter.length != 1) {
			isInputOk = false;
			$("#LetterError").html("Please enter a letter!");
			$("#LetterError").css("color", "orange");
		}

		if (letter.length == 1 && (letter < 'A' || letter > 'Z')) {
			isInputOk = false;
			$("#LetterError").html("Guess must be a letter ([a-z][A-Z])!");
			$("#LetterError").css("color", "red");
		}

		if (letter.length == 1 && GuessedAlready.includes(letter)) {
			isInputOk = false;
			$("#LetterError").html("You already guessed this letter!");
			$("#LetterError").css("color", "green");
		}

		if (isInputOk) {
			Letter = letter;
		}

	}


	function submitLetter() {
		var lives = Lives;
		if (isInputOk) {
			ApplyGuess();
			DisplayWord();

			if (lives != Lives) {
				$("#LetterError").html("Bad Guess! You just lost 1 life.");
				$("#LetterError").css("color", "red");
			}
			else {
				$("#LetterError").html("Good guess!");
				$("#LetterError").css("color", "green");
			}

			UpdateGame();
		}
		isInputOk = false;
	}


	function UpdateGame(){
		if (Lives <= 0) {
			lose();
		}
		else {
			var hasWon = true;
			for (var i = 0; i < DiscoveredLetters.length; i++) {
				if (!DiscoveredLetters[i]) {
					hasWon = false;
					break;
				}
			}
			if (hasWon) {
				win();
			}
		}
	}


	function lose() {
		$("#span1").html("");
		$("#span4").html("");
		$("#span5").html("");
		$("#span6").html("");
		$("#span7").html("");
		$("#span8").html("");
		$("#spansCenterBug").css("height", "90px");
		$("#spansCenterBug").css("color", "white");
		$("#spansCenterBug").css("border-style", "solid");
		$("#spansCenterBug").css("border-color", "red");
		$("#spansCenterBug").css("background-color", "red");
		$("#span9").html("Sorry, you lost. The word was " + Word + ".");
		$("#span10").html("<img src='img/h" + Lives + ".png' class='hENDimage'>");
	}


	function win() {
		$("#span1").html("");
		$("#span4").html("");
		$("#span5").html("");
		$("#span6").html("");
		$("#span7").html("");
		$("#span8").html("");
		$("#spansCenterBug").css("height", "90px");
		$("#spansCenterBug").css("color", "white");
		$("#spansCenterBug").css("border-style", "solid");
		$("#spansCenterBug").css("border-color", "green");
		$("#spansCenterBug").css("background-color", "green");
		$("#span9").html("Congratulations, you won! The word was " + Word + ".");
		$("#span10").html("<img src='img/h" + Lives + ".png' class='hENDimage'>");
	}


	function Hint() {
		var letter = ' ';
		for (var i = 0; i < DiscoveredLetters.length; i++) {
			if (letter == ' ' && !DiscoveredLetters[i]) {
				letter = Word[i]; 
			}
			if (Word[i] == letter) {
				DiscoveredLetters[i] = true;
			}
		}
		Lives -= 1;
		DisplayWord();
		UpdateGame();
	}


	function ApplyGuess() {
		GuessedAlready += Letter;
		var goodGuess = false;
		for (var i = 0; i < Word.length; i++) {
			if (Word[i] == Letter) {
				goodGuess = true;
				DiscoveredLetters[i] = true;
			}
		}
		if (!goodGuess) {
			Lives -= 1;
		}
	}


	function submitWord() {
		if (isInputOk) {

			DiscoveredLetters = new Array(Word.length);
			for (var i = 0; i < DiscoveredLetters.length; i++) {
				DiscoveredLetters[i] = false;
			}
			DisplayWord();
			SetupButtons();
		}
	}


	function SetupButtons() {
		$("#span2").html("");
		$("#span3").html("");
		$("#span4").removeAttr("hidden");
		$("#span5").removeAttr("hidden");
		$("#span6").removeAttr("hidden");
		$("#span7").removeAttr("hidden");
		$("#span8").removeAttr("hidden");
	}


	function DisplayWord() {
		$("#span1").html("The Word Is :");
		for (var i = 0; i < DiscoveredLetters.length; i++) {
			if (DiscoveredLetters[i]) {
				$("#span1").append(" " + Word[i]);
			}
			else {
				$("#span1").append(" _");
			}
		}
		$("#span7").html("Lives : " + Lives);
		$("#span8").html("<img src='img/h" + Lives + ".png' class='himage'>");
	}
})