var ctx;
var shape = new Object();

var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var food_remain;
var lives;
const rows = 13;
const cols = 18;

var playerDirection;

$(document).ready(function () {
	ctx = canvas.getContext("2d");
	start();
});


function start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	food_remain = 50;
	lives = 5;
	start_time = new Date();
	// drawPacman(6,17,'white',20);

	createEmptyMaze();
	setWalls();
	putFoodRandomaly();
	setRandomPacmanPosition();

	// draw();


	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);

	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	UpdatePosition();
	interval = setInterval(UpdatePosition, 180);




}

function setRandomPacmanPosition() {
	let cell = getEmptyCell();
	let row = cell[0];
	let col = cell[1];
	board[row][col] = 2;
	shape.i = row;
	shape.j = col;
}

function GetKeyPressed() {
	if (keysDown[keys.up]) {
		playerDirection = 'up';
		return 1;
	}
	if (keysDown[keys.down]) {
		playerDirection = 'down';
		return 2;
	}
	if (keysDown[keys.left]) {
		playerDirection = 'left';
		return 3;
	}
	if (keysDown[keys.right]) {
		playerDirection = 'right';
		return 4;
	}
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {//up
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 2) {//down
		if (shape.i < rows && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (x == 3) {//left
		if (board[shape.i][shape.j - 1] != 4) {
			if (shape.j > 0)
				shape.j--;
			else
				shape.j = cols - 1;
		}
	}
	if (x == 4) {//right
		if (board[shape.i][shape.j + 1] != 4) {
			if (shape.j + 1 < cols)
				shape.j++;
			else
				shape.j = 0;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		draw();
	}
}

