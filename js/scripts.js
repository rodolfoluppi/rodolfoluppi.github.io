let numSquares = 6;
let colors = [];
let pickedColor;
let correctAnswers = 0;
let guesses = 12;
let score = 0;
let timeout = 0;
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const squares = document.getElementsByClassName("square");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.getElementsByClassName("mode");
const correctDisplay = document.querySelector("#correctDisplay");
const guessesDisplay = document.querySelector("#guessesDisplay");
const scoreDisplay = document.querySelector("#scoreDisplay");

//initialize the game
init();

function init(){
	setupButtons();
	setupSquares();
	reset();
}

//assign the listeners to the squares
function setupSquares(){
	for (let i = 0; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			let clickedColor = this.style.backgroundColor;
			console.log(clickedColor,pickedColor);
			//compares the clicked and the picked color
			if(clickedColor===pickedColor){
				resetButton.textContent = "Play again?"
				changeColors(clickedColor);
				messageDisplay.textContent = "RIGHT!";
				messageDisplay.style.color = clickedColor;
				if(h1.style.backgroundColor != clickedColor){
					correctAnswers++;
					correctDisplay.textContent = correctAnswers;
					timeout = setTimeout(reset, 2000);
				}
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "WRONG!"
				messageDisplay.style.color = clickedColor;
				if(guesses>0){
				guesses--;
				guessesDisplay.textContent = guesses;} else {
					gameOver();
				}
			}	
		});
	}
}

function gameOver(){
	colorDisplay.textContent = "GAME OVER!";
	alert("GAME OVER! You knew exactly "+correctAnswers+" colors. Good job! :)");
	guesses = 12;
	guessesDisplay.textContent = guesses;
	scoreDisplay.textContent = correctAnswers;
	correctAnswers = 0;
	correctDisplay.textContent = correctAnswers;
	reset();

}

// add the event listeners to the buttons
function setupButtons(){
	for (let i = 0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click",function(){
			for(let j = 0; j<modeButtons.length; j++){
				modeButtons[j].classList.remove("selected");
			}
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}
	//add listener to the reset button
	resetButton.addEventListener("click", function(){
		reset();
	});
}

//reset the game
function reset(){
	clearTimeout(timeout);
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (let i = 0; i<squares.length; i++){
		if(colors[i]){
		    squares[i].style.display = "block";	
		    squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "#BF1616";
	resetButton.textContent = "New colors";
	messageDisplay.textContent = "";
}

//changes each square backgroundColor to the passed color
function changeColors(color){
	for(let i = 0; i< squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}
//returns a random color from colors array
function pickColor(){
	let random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	let colors = [];
	for (let i = 0; i<num ; i++){
		colors.push(randomColor());
	}
	return colors;

}
//returns a random rgb(r, g, b) string
function randomColor(){
	let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	let color = "rgb("+r+", "+g+", "+b+")";
	return color;
}
