var ctx;
var shape = new Object();
var gameIsOn = false;
// game stuff
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var gameStatus;
var time_left;
var isSleep;

// pacman movement
var lastPressed;


// ghosts
var monster_turn = 125;
var num_of_monsters = 4;
var monsters = new Array();

// cherry
var cherry = new Object();
var cherry_turn = 400;
var cherryImg;

// medication
var medicationImg;

// clock
var clockImg;

var food_remain = 90;
var lives;
const rows = 13;
const cols = 18;


$(document).ready(function () {
	ctx = canvas.getContext("2d");
});

function playTheme() {
	document.getElementById('gametheme').play();
	document.getElementById('gametheme').volume = 0.2;
}
function stopTheme() {
	document.getElementById('gametheme').pause();
}



function endGame() {
	showMenu();
	clearInterval(interval);
	clearInterval(timmer_interval);
	stopTheme();
}



function startNewGame() {
	
	playTheme();
	showSettings();
	gameIsOn = true;
	// initialization fields for every time the use start a new game:
	board = new Array();
	score = 0;
	pac_color = "yellow";
	// food_remain = 50;
	food_remain = lblBalls.value;
	lives = 5;
	start_time = new Date();
	gameStatus = 0;
	time_left = timmer;
	isSleep = false;
	

	// pacman
	shape.speed = 0.5;
	shape.move = false;
	pacman_mouth_turn = 40;

	// ghosts
	monster_turn = 125;

	// cherry
	cherry_turn = 400;

	//building a new maze:
	createEmptyMaze();
	setWalls();
	setMedication();
	setClock();
	putFoodRandomaly();
	setRandomPacmanPosition();
	setGhosts();
	setCherry();

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
			lastPressed = e.keyCode;
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


	interval = setInterval(UpdatePosition, 1);
	timmer_interval = setInterval(function () { time_left-- }, 1000);
}

function getLastPressed(){
	if (lastPressed == keys.up){
		return 1;
	}
	if (lastPressed == keys.down){
		return 2;
	}
	if (lastPressed == keys.left){
		return 3;
	}
	if (lastPressed == keys.right){
		return 4;
	}
}

function GetKeyPressed() {
	if (keysDown[keys.up]) {
		return 1;
	}
	if (keysDown[keys.down]) {
		return 2;
	}
	if (keysDown[keys.left]) {
		return 3;
	}
	if (keysDown[keys.right]) {
		return 4;
	}
}

function UpdatePosition() {

	if (gameStatus == 1) {
		// game lost because of lives
		gameLostLives();
		return;
	}
	else if (gameStatus == 2) {
		// won game
		gameCompleted();
		return;
	}
	else if (gameStatus == 3) {
		// game lost because of time
		gameLostScore();
		return;
	}

	// PACMAN MOVEMENT
	pacmanMovement();

	// GHOSTS MOVEMENT
	ghostMovement();

	// CHERRY MOVEMENT
	cherryMovement();

	// CHECKS
	checkIfFood();

	checkIfGhost();

	checkIfCherry();

	checkIfMedication();

	checkIfClock();


	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;


	// TIME's UP?
	if (time_left <= 0) {
		lblTime.value = 0;
		if (score >= 100) {
			gameStatus = 2;
		}
		else {
			gameStatus = 3;
		}
	}
	if (!isSleep){
		draw();
	}
}

function checkIfMedication() {
	var shape_indexes = getIndexes(shape.j, shape.i);
	index_i = shape_indexes[1];
	index_j = shape_indexes[0];

	if (board[index_i][index_j] == 1) {
		var medication_i = index_i * 40 + 20;
		var medication_j = index_j * 40 + 20;
		if (Math.abs(shape.i - medication_i) <= 10 && Math.abs(shape.j - medication_j) <= 10) {
			if (lives < 5) {
				increaseLifeCounter();
				board[index_i][index_j] = 0;
				var medicationAudio = new Audio("./audio/medication.mp3");
				medicationAudio.volume = 0.2;
				medicationAudio.currentTime=0;
				medicationAudio.play();
			}
		}

	}
}

function checkIfClock(){
	var shape_indexes = getIndexes(shape.j, shape.i);
	index_i = shape_indexes[1];
	index_j = shape_indexes[0];

	if (board[index_i][index_j] == 2) {
		var clock_i = index_i * 40 + 20;
		var clock_j = index_j * 40 + 20;
		if (Math.abs(shape.i - clock_i) <= 10 && Math.abs(shape.j - clock_j) <= 10) {
			updateTime();
			board[index_i][index_j] = 0;
			var clockAudio = new Audio("./audio/clock.mp3");
			clockAudio.volume = 0.2;
			clockAudio.currentTime=0;
			clockAudio.play();
		}

	}
}

function updateTime(){
	if (time_left + 10 >= timmer){
		time_left = timmer;
	}
	else {
		time_left +=10;
	}
}

function pacmanMovement() {

	var x = getLastPressed();
	if (isInMiddle() || (shape.direction == "left" && x == 4) || (shape.direction == "right" && x == 3) || (shape.direction == "up" && x == 2) || (shape.direction == "down" && x == 1)) {
		var shape_indexes = getIndexes(shape.j, shape.i);
		let shape_row = shape_indexes[0];
		let shape_col = shape_indexes[1];
		if (x == 1) {
			if (board[shape_col][shape_row-1] != 4){
				shape.move = true;
				shape.direction = "up";
			}
		}
		else if (x == 2) {
			if (board[shape_col][shape_row+1] != 4){
				shape.move = true;
				shape.direction = "down";
			}
		}
		else if (x == 3) {
			if (shape_col-1 <= 0){
				shape.move = true;
				shape.direction = "left";
			}
			else if (board[shape_col-1][shape_row] != 4){
				shape.move = true;
				shape.direction = "left";
			}
		}
		else if (x == 4) {
			if (shape_col+1 >= 17){
				shape.move = true;
				shape.direction = "right";
			}
			else if (board[shape_col+1][shape_row] != 4){
				shape.move = true;
				shape.direction = "right";
			}
		}
	}
	movePacman();
}

function checkIfFood() {
	// CHECK IF FOOD:
	var shape_indexes = getIndexes(shape.j, shape.i);
	let shape_row = shape_indexes[0];
	let shape_col = shape_indexes[1];
	if (board[shape_col][shape_row] >= 5) {
		if (isInMiddle()) {
			score += board[shape_col][shape_row];
			board[shape_col][shape_row] = 0;
			var eatAudio = new Audio("./audio/woosh.mp3");
			eatAudio.volume = 1;
			eatAudio.currentTime=0;
			eatAudio.play();
		}
	}
}

function checkIfGhost() {
	// CHECK IF GHOST:
	for (var k = 0; k < num_of_monsters; k++) {
		var currentMonster = monsters[k];
		if (check_x_and_y(currentMonster.i, currentMonster.j, shape.i, shape.j)) {
			$('#deaththeme')[0].play();
			if (lives == 1) {
				score -= 10;
				decreaseLifeCounter();
				gameStatus = 1;
			}
			else {
				score -= 10;
				stopGame();
				setTimeout(continueGame, 2000);
				// alert("lost live");
				resetKeys();
				resetPositions();
				decreaseLifeCounter();
			}
		}
	}
}

function checkIfCherry() {
	// check if cherry:
	if (!cherry.eaten) {
		if (check_x_and_y(cherry.i + 7, cherry.j + 7, shape.i, shape.j)) {
			score += 50;
			cherry.eaten = true;
			var eatAudio = new Audio("./audio/eat.wav");
			eatAudio.volume = 0.2;
			eatAudio.currentTime=0;
			eatAudio.play();
		}
	}
}

function cherryMovement() {
	// CHERRY
	if (cherry_turn == 0) {
		decideCherryDirection();
		cherry_turn = 400;
	}
	cherry_turn--;
	moveCherry();
}

function decideCherryDirection() {
	var cherry_indexes = getIndexes(cherry.j, cherry.i);
	var index_i = cherry_indexes[1];
	var index_j = cherry_indexes[0];

	var found = false;
	while (!found) {
		var randomNum = Math.random();
		if (randomNum < 0.25) {
			if (board[index_i][index_j - 1] != 4) {
				cherry.direction = "up";
				found = true;
			}
		}
		else if (randomNum >= 0.25 && randomNum < 0.5) {
			if (board[index_i][index_j + 1] != 4) {
				cherry.direction = "down";
				found = true;
			}
		}
		else if (randomNum >= 0.5 && randomNum < 0.75) {
			if (board[index_i - 1][index_j] != 4) {

				cherry.direction = "left";
				found = true;
			}
		}
		else {
			if (board[index_i + 1][index_j] != 4) {
				cherry.direction = "right";
				found = true;
			}
		}
	}
}

function moveCherry() {
	if (cherry.direction == "up") {
		// UP
		cherry.j -= cherry.speed;
	}
	else if (cherry.direction == "down") {
		// DOWN
		cherry.j += cherry.speed;
	}
	else if (cherry.direction == "left") {
		// LEFT
		cherry.i -= cherry.speed;
	}
	else if (cherry.direction == "right") {
		// RIGHT
		cherry.i += cherry.speed;
	}
}

function ghostMovement() {
	// GHOSTS
	if (monster_turn == 0) {
		decideMonstersDirection();
		monster_turn = 125;
	}
	monster_turn--;
	moveMonsters();
}

function check_x_and_y(monster_x, monster_y, shape_x, shape_y) {
	if (Math.abs(monster_x - shape_x) <= 7) {
		if (Math.abs(monster_y - shape_y) <= 7) {
			// collistion
			return true;
		}
	}
	return false;
}

function resetKeys() {
	lastPressed = null;
}



function gameLostLives() {
	gameIsOn = false;
	setTimeout(function () { alert("LOSER!!!"); }, 100);
	endGame();
}

function gameCompleted() {
	gameIsOn = false;
	setTimeout(function () { alert("Winner!!!"); }, 100);
	endGame();
}

function gameLostScore() {
	gameIsOn = false;
	setTimeout(function () { alert("You are better than " + score + " points!") }, 100);
	endGame();
}

function isInMiddle() {
	var shape_indexes = getIndexes(shape.i, shape.j);
	var i_index = shape_indexes[0]
	var j_index = shape_indexes[1];

	var middle_i = i_index * 40 + 20;
	var middle_j = j_index * 40 + 20;

	if (shape.i == middle_i && shape.j == middle_j) {
		return true;
	}
	return false;
}

function pacmanMouth() {
	if (pacman_mouth_turn == 0) {
		if (shape.mouth == "open") {
			shape.mouth = "close";
			pacman_mouth_turn = 40;
		}
		else {
			shape.mouth = "open";
			pacman_mouth_turn = 40;
		}
	}
	pacman_mouth_turn--;
}

function movePacman() {
	if (shape.move) {
		var indexi;
		var indexj;
		// UP
		if (shape.direction == "up") {
			indexi = Math.floor(shape.i / 40);
			indexj = Math.floor((shape.j - 20.5) / 40);
			if (board[indexi][indexj] != 4) {
				shape.j -= shape.speed;
				pacmanMouth();
			}
		}
		// DOWN
		else if (shape.direction == "down") {
			indexi = Math.floor(shape.i / 40);
			indexj = Math.floor((shape.j + 20) / 40);
			if (board[indexi][indexj] != 4) {
				shape.j += shape.speed;
				pacmanMouth();
			}
		}
		// LEFT
		else if (shape.direction == "left") {
			indexi = Math.floor((shape.i - 20.5) / 40);
			indexj = Math.floor(shape.j / 40);
			if (indexi < 0) {
				shape.i = 700;
				shape.j = 260
			}
			else if (board[indexi][indexj] != 4) {
				shape.i -= shape.speed;
				pacmanMouth();
			}
		}
		// RIGHT
		else if (shape.direction == "right") {
			indexi = Math.floor((shape.i + 20) / 40);
			indexj = Math.floor(shape.j / 40);
			if (indexi > 17) {
				shape.i = 20;
				shape.j = 260;
			}
			else if (board[indexi][indexj] != 4) {
				shape.i += shape.speed;
				pacmanMouth();
			}
		}
	}
}

function decideMonstersDirection() {
	for (var k = 0; k < num_of_monsters; k++) {
		var randNum = Math.random();
		if (randNum <= 0.2){
			// random move
			randomMove(monsters[k]);
		}
		else {
			// heuristic move
			heuristicMove(monsters[k]);
		}
	}
}

function randomMove(monster){
	var found = false;
	monster_indexes = getIndexes(monster.j, monster.i);
	monster_row = monster_indexes[0];
	monster_col = monster_indexes[1];
	
	while (!found){
		var randNum = Math.random();
		if (randNum <= 0.25){
			// up
			if (board[monster_col][monster_row-1] != 4){
				monster.direction = "up";
				found = true;
			}
		}
		else if (randNum > 0.25 && randNum <= 0.5){
			// down
			if (board[monster_col][monster_row+1] != 4){
				monster.direction = "down";
				found = true;
			}
		}
		else if(randNum > 0.5 && randNum <=0.75){
			// left
			if (board[monster_col-1][monster_row] != 4){
				monster.direction = "left";
				found = true;
			}
		}
		else{
			// right
			if (board[monster_col+1][monster_row] != 4){
				monster.direction = "right";
				found = true;
			}
		}
	}

}

function heuristicMove(monster){
	var monster_index_i = Math.floor(monster.i / 40);
	var monster_index_j = Math.floor(monster.j / 40);
	var shape_index_i = Math.floor(shape.i / 40);
	var shape_index_j = Math.floor(shape.j / 40);
	var minHeuristic = 999999;
	var minDirection;
	// try LEFT
	if (board[monster_index_i - 1][monster_index_j] != 4) {
		// calculate manhattan distance
		var manhattan = Math.abs(monster_index_i - 1 - shape_index_i) + Math.abs(monster_index_j - shape_index_j);
		if (manhattan < minHeuristic) {
			minHeuristic = manhattan;
			minDirection = "left";
		}
	}
	// try UP
	if (board[monster_index_i][monster_index_j - 1] != 4) {
		// calculate manhattan distance
		var manhattan = Math.abs(monster_index_i - shape_index_i) + Math.abs(monster_index_j - 1 - shape_index_j);
		if (manhattan < minHeuristic) {
			minHeuristic = manhattan;
			minDirection = "up";
		}
	}
	// try DOWN
	if (board[monster_index_i][monster_index_j + 1] != 4) {
		// calculate manhattan distance
		var manhattan = Math.abs(monster_index_i - shape_index_i) + Math.abs(monster_index_j + 1 - shape_index_j);
		if (manhattan < minHeuristic) {
			minHeuristic = manhattan;
			minDirection = "down";
		}
	}
	// try RIGHT
	if (board[monster_index_i + 1][monster_index_j] != 4) {
		// calculate manhattan distance
		var manhattan = Math.abs(monster_index_i + 1 - shape_index_i) + Math.abs(monster_index_j - shape_index_j);
		if (manhattan < minHeuristic) {
			minHeuristic = manhattan;
			minDirection = "right";
		}
	}
	monster.direction = minDirection;
}

function moveMonsters() {
	for (var k = 0; k < num_of_monsters; k++) {
		var monster = monsters[k];
		if (monster.direction == "up") {
			// up
			monster.j -= monster.speed;
		}
		else if (monster.direction == "down") {
			// down
			monster.j += monster.speed;
		}
		else if (monster.direction == "left") {
			// left
			monster.i -= monster.speed;
		}
		else if (monster.direction == "right") {
			//right
			monster.i += monster.speed;
		}
	}
}

function resetPositions() {

	// PACMAN
	setRandomPacmanPosition();

	setGhosts();
	monster_turn = 200;

}

function stopGame(){
	clearInterval(interval);
	clearInterval(timmer_interval);
	isSleep = true;
}

function continueGame(){
	interval = setInterval(UpdatePosition, 1);
	timmer_interval = setInterval(function () { time_left-- }, 1000);
	isSleep = false;
}