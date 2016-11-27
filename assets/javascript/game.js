var	cMinNumber = 1;
var cMaxNumber = 12;
var randomMin = 19;
var randomMax = 120;
var gemsNumbers = []; 
var gemsImages = [
	"assets/images/gemBlue.jpg",
	"assets/images/gemGreen.jpg",
	"assets/images/gemPurple.jpg",
	"assets/images/gemYellow.jpg",
];
var maxGems = 4;
var targetNumber = 0;
var counter = 0;
var winCounter = 0;
var lossesCounter = 0;


//Create a random number between 2 parameters
//a will be a minimum number
//b will be a maximum number
function randomNumber(a,b){
	return(Math.floor(Math.random() * b) + a);
}

//Create an array of ramdom numbers for the Gems
function gNumber(){
	var g = [];
	var number;
	for (var i = 0; i < maxGems ; i++) {
		number = randomNumber(cMinNumber, cMaxNumber);
		//This if avoid having duplicate numbers in the array
		if (g.indexOf(number)>=0) {
			i--;
		}
		else{
			g[i] = number;
		}
	}
	console.log(g);
	return g;
	
}

function resetGame(){
	gemsNumbers = []; 
	targetNumber = 0 ;
	counter = 0;
	$("#numberToGuess, #scoreDiv, #gemsDiv").empty();
}

function startGame(){
	targetNumber = randomNumber(randomMin, randomMax);

	$("#numberToGuess").text(targetNumber);

	gemsNumbers = gNumber();

	//For each iteration, we will create an image Crystal
	//and will get added to the page
	for (var i = 0; i < gemsImages.length; i++) {
		var crystal = $("<img>").addClass("crystalImage").attr("src", gemsImages[i]).attr("data-crystalvalue", gemsNumbers[i]);
		$("#gemsDiv").append(crystal);
		console.log(crystal[0]);
	}

}


$(document).ready(function(){
	if(winCounter == 0 && lossesCounter == 0){
		startGame();

	}
	//We will apply a click event to every crystal Image in the page
	//The on click funtion in the document ensure the differetn
	//iterations of the game
	$(document).on('click', '.crystalImage', function() {
		// Determining the crystal's value requires us to extract the value from the data attribute.
		// Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
		// Using the .data("crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
		// (It automatically strips the "data-" part).
		var crystalValue = ($(this).data("crystalvalue"));

		// We then add the crystalValue to the user's "counter" which is a global variable.
		// Every click, from every crystal adds to the global counter.
		counter = counter + crystalValue;

		// All of the same game win-lose logic applies. So the rest remains unchanged.
		$("#scoreDiv").text("New score: " + counter);

		if (counter === targetNumber) {
			winCounter++;
			$("#message").text("You win!");
			$("#wins").text(winCounter);
			resetGame();
			startGame();
		}

		else if (counter > targetNumber) {
			lossesCounter++;
		  	$("#message").text("You lose!");
		  	console.log(lossesCounter);
		  	$("#losses").text(lossesCounter);
		  	resetGame();
			startGame();
		}

	});//End document on click


});//End Document Ready Function
