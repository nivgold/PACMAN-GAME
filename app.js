var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

//SETTINGS:
var keys = {
	key_up:38, key_Down:40, key_Left:37, key_right:39,
	setDefualt: function () { this.key_up = 38, this.key_Down = 40, this.key_Left = 37, this.key_right = 39 },
	changeKeys: function (up, down, left, right) { this.key_up = up, this.key_Down = down, this.key_Left = left, this.key_right = right }
}
var lives = 5;
var username = "player";
var gameStatus = 0;
//balls
var p5BallImg;
var p15BallImg;
var p25BallImg;
//monsters:
var monster_turn = 12;
var num_of_monsters = 4;
var monsters = new Array();
//END OF SETTINGS
//////////////////////////////////

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

// ++++++++++++++++++ EACH SLOT IS 60x60 PIXELS +++++++++++++++++++
// FOOD: 1
// PACMAN: 2
// MONSTERS: <0
// WALL: 4
// NOTHING: 0 
function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 234;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();

	// START OF SETTINGS
	keys.setDefualt();

	//BALLS Imgs
	p5BallImg = new Image();
	p5BallImg.src = "./balls/blue.png";
	p15BallImg = new Image();
	p15BallImg.src = "./balls/red.png"
	p25BallImg = new Image();
	p25BallImg.src = "./balls/yellow.png"

	//MONSTER:
	for (let k=0; k<num_of_monsters; k++){
		monsters[k] = new Object();
		if (k==0){
			monsters[k].i = 90;
			monsters[k].j = 90;
		}
		else if(k==1){
			monsters[k].i = 990;
			monsters[k].j = 90;
		}
		else if(k==2){
			monsters[k].i = 990;
			monsters[k].j = 690;
		}
		else if(k==3){
			monsters[k].i = 90;
			monsters[k].j = 690;
		}
		monsters[k].speed = 5;
	}

	for (var m=0; m<18; m++){
		board[m] = new Array();
	}

	//END OF SETTINGS
	///////////////

	
	for (var i = 0; i < 18; i++) {
		for (var j = 0; j < 13; j++) {
			//WALLS:
			if (
				(i == 0 && j == 0) ||
				(i == 0 && j == 1) ||
				(i == 0 && j == 2) ||
				(i == 0 && j == 3) ||
				(i == 0 && j == 4) ||
				(i == 0 && j == 5) ||
				(i == 0 && j == 7) ||
				(i == 0 && j == 8) ||
				(i == 0 && j == 9) ||
				(i == 0 && j == 10) ||
				(i == 0 && j == 11) ||
				(i == 0 && j == 12) ||
				(i == 1 && j == 0) ||
				(i == 1 && j == 5) ||
				(i == 1 && j == 7) ||
				(i == 1 && j == 8) ||
				(i == 1 && j == 12) ||
				(i == 2 && j == 0) ||
				(i == 2 && j == 2) ||
				(i == 2 && j == 3) ||
				(i == 2 && j == 10) ||
				(i == 2 && j == 12) ||
				(i == 3 && j == 0) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 3 && j == 7) ||
				(i == 3 && j == 8) ||
				(i == 3 && j == 12) ||
				(i == 4 && j == 0) ||
				(i == 4 && j == 1) ||
				(i == 4 && j == 5) ||
				(i == 4 && j == 7) ||
				(i == 4 && j == 8) ||
				(i == 4 && j == 9) ||
				(i == 4 && j == 11) ||
				(i == 4 && j == 12) ||
				(i == 5 && j == 0) ||
				(i == 5 && j == 8) ||
				(i == 5 && j == 9) ||
				(i == 5 && j == 11) ||
				(i == 5 && j == 12) ||
				(i == 8 && j == 8) ||
				(i == 6 && j == 0) ||
				(i == 6 && j == 2) ||
				(i == 6 && j == 5) ||
				(i == 6 && j == 6) ||
				(i == 6 && j == 8) ||
				(i == 6 && j == 12) ||
				(i == 7 && j == 0) ||
				(i == 7 && j == 2) ||
				(i == 7 && j == 4) ||
				(i == 7 && j == 6) ||
				(i == 7 && j == 8) ||
				(i == 7 && j == 10) ||
				(i == 7 && j == 12) ||
				(i == 8 && j == 0) ||
				(i == 8 && j == 6) ||
				(i == 8 && j == 10) ||
				(i == 8 && j == 12) ||
				(i == 9 && j == 0) ||
				(i == 9 && j == 6) ||
				(i == 9 && j == 10) ||
				(i == 9 && j == 12) ||
				(i == 10 && j == 0) ||
				(i == 10 && j == 2) ||
				(i == 10 && j == 4) ||
				(i == 10 && j == 6) ||
				(i == 10 && j == 10) ||
				(i == 10 && j == 12) ||
				(i == 11 && j == 0) ||
				(i == 11 && j == 2) ||
				(i == 11 && j == 5) ||
				(i == 11 && j == 6) ||
				(i == 11 && j == 8) ||
				(i == 11 && j == 12) ||
				(i == 12 && j == 0) ||
				(i == 12 && j == 8) ||
				(i == 12 && j == 9) ||
				(i == 12 && j == 11) ||
				(i == 12 && j == 12) ||
				(i == 13 && j == 0) ||
				(i == 13 && j == 1) ||
				(i == 13 && j == 5) ||
				(i == 13 && j == 7) ||
				(i == 13 && j == 8) ||
				(i == 13 && j == 9) ||
				(i == 13 && j == 11) ||
				(i == 13 && j == 12) ||
				(i == 14 && j == 0) ||
				(i == 14 && j == 3) ||
				(i == 14 && j == 4) ||
				(i == 14 && j == 5) ||
				(i == 14 && j == 7) ||
				(i == 14 && j == 8) ||
				(i == 14 && j == 12) ||
				(i == 15 && j == 0) ||
				(i == 15 && j == 2) ||
				(i == 15 && j == 3) ||
				(i == 15 && j == 10) ||
				(i == 15 && j == 12) ||
				(i == 16 && j == 0) ||
				(i == 16 && j == 5) ||
				(i == 16 && j == 7) ||
				(i == 16 && j == 8) ||
				(i == 16 && j == 12) ||
				(i == 17 && j == 0) ||
				(i == 17 && j == 1) ||
				(i == 17 && j == 2) ||
				(i == 17 && j == 3) ||
				(i == 17 && j == 4) ||
				(i == 17 && j == 5) ||
				(i == 17 && j == 7) ||
				(i == 17 && j == 8) ||
				(i == 17 && j == 9) ||
				(i == 17 && j == 10) ||
				(i == 17 && j == 11) ||
				(i == 17 && j == 12) 
			) {
				board[i][j] = 4;
			}
			else{
				board[i][j] = 0;
			}
		}
	}


	// PACMAN:
	while(pacman_remain>0){
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		shape.direction = 4;
		pacman_remain--;
		board[emptyCell[0]][emptyCell[1]] = 2;
	}
	
	//FOOD:
	var p5Ball = 0.6*food_remain;
	var p15Ball = 0.3*food_remain;
	var p25Ball = food_remain - (p5Ball + p15Ball);

	while( p5Ball > 0){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		p5Ball--;
	}
	while( p15Ball > 0){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		p15Ball--;
	}
	while( p25Ball > 0){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		p25Ball--;
	}


	// while (food_remain > 0) {
	// 	var emptyCell = findRandomEmptyCell(board);
	// 	board[emptyCell[0]][emptyCell[1]] = 1;
	// 	food_remain--;
	// }

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);

	interval = setInterval(UpdatePosition, 50);

	console.log(board);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 17 + 1);
	var j = Math.floor(Math.random() * 12 + 1);
	while (board[i][j] != 0 || (i==1 && j==1) || (i==16 && j==11) || (i==16 && j==1) || (i==1 && j==16)) {
		i = Math.floor(Math.random() * 17 + 1);
		j = Math.floor(Math.random() * 12 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	//UP
	if (keysDown[38]) {
		return 1;
	}
	//DOWN
	if (keysDown[40]) {
		return 2;
	}
	//LEFT
	if (keysDown[37]) {
		return 3;
	}
	//RIGHT
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives;
	lblName.value = username;

	drawCanvas();

	for (var i = 0; i < 18; i++) {
		for (var j = 0; j < 13; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;

			//DRAW PACMAN
			if (board[i][j] == 2) {
				drawPacman(center.x, center.y, shape.direction);

			} 
			//DRAW FOOD
			else if (board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25) {
				drawBall(i, j, board[i][j]);
				// context.beginPath();
				// context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				// context.fillStyle = "white"; //color
				// context.fill();

				// context.font = "10px Comic Sans MS";
				// context.fillStyle = "red";
				// context.fillText("1", center.x -2.5, center.y + 4);
				
			} 
			//DRAW WALL
			else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "blue"; //color
				context.fill();
			}
		}
	}

	// draw all the monsters
	for (var k =0 ; k<num_of_monsters; k++){
		var monster = monsters[k];
		drawMonster(monster.i, monster.j, monster.direction, k);
	}
}

function UpdatePosition() {
	if (gameStatus == 1){
		// game lost
		gameLost();
		return;
	}
	else if (gameStatus == 2){
		// game completed
		gameCompleted();
		return;
	}

	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		shape.direction = x;
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		shape.direction = x;
		if (shape.j < 12 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		shape.direction = x;
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		shape.direction = x;
		if (shape.i < 17 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}

	// check if food:
	if (board[shape.i][shape.j] >= 5) {
		score+=board[shape.i][shape.j];
	}

	if (monster_turn == 0){
		decideMonstersDirection();
		monster_turn=12;
	}
	monster_turn--;
	moveMonsters();

	// check if monster:
	var shape_x = shape.i*60 +30;
	var shape_y = shape.j*60 +30;
	for (var k =0; k<num_of_monsters; k++){
		var currentMonster = monsters[k];
		if (check_x_and_y(currentMonster.i, currentMonster.j, shape_x, shape_y)){
			if (lives == 1){
				Draw();
				lives--;
				score -= 10;
				gameStatus = 1;
			}
			else{
				Draw();
				resetKeys();
				score-=10;
				lives--;
				window.alert("lost live");
				resetPositions();
			}
		}
	}
	
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		gameStatus = 2;
		Draw();
	} else {
		
	}
	Draw();
}

function drawCanvas(){
	canvas = document.getElementById('canvas');
	canvas.heigth = 780;
	canvas.weight = 1080;
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPacman(centerx, centery, direction){

	if (direction == 4){
		//RIGHT
		context.beginPath();
		context.arc(centerx, centery,  15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
		context.lineTo(centerx, centery);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(centerx + 5, centery - 10, 3, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}
	
	else if (direction == 1){
		//UP
		context.beginPath();
		context.arc(centerx, centery,  15, 0, 1.65 * Math.PI, true); // half circle
		context.lineTo(centerx, centery);
		context.arc(centerx, centery, 15, 0, 1.35 * Math.PI);
		context.lineTo(centerx, centery);
		context.fillStyle = pac_color;
		context.fill();
		context.beginPath();
		context.arc(centerx -8 , centery - 6, 3, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}

	else if(direction == 3){
		//LEFT
		context.beginPath();
		context.arc(centerx, centery, 15, -0.85 * Math.PI, 0.85 * Math.PI);
		context.lineTo(centerx, centery);
		context.fillStyle = pac_color;
		context.fill();
		context.beginPath();
		context.arc(centerx -5 , centery - 10, 3, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}

	else if (direction == 2){
		// DOWN
		context.beginPath();
		context.arc(centerx, centery, 15, 0.35*Math.PI, 0.65*Math.PI, true);
		context.lineTo(centerx, centery);
		context.fillStyle = pac_color;
		context.fill();
		context.beginPath();
		context.arc(centerx+8, centery+6, 3, 0, 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
	}
	
}

function drawMonster(centerx, centery, direction, id){

	// MONSTER BODY
	context.beginPath();
	context.arc(centerx, centery, 15, 0, Math.PI, true);
	
	if (id == 0){
		context.fillStyle = "red";
	}
	else if(id==1){
		context.fillStyle = "blue";
	}
	else if(id==2){
		context.fillStyle = "yellow";
	}
	else{
		context.fillStyle = "green";
	}
	context.fill();


	//ZIGZAG
	context.moveTo(centerx-15, centery);
	context.lineTo(centerx-15, centery+15);
	context.lineTo(centerx-15+3.75, centery+10);
	context.lineTo(centerx-15+3.75*2, centery+15);
	context.lineTo(centerx-15+3.75*3, centery+10);
	context.lineTo(centerx-15+3.75*4, centery+15);
	context.lineTo(centerx-15+3.75*5, centery+10);
	context.lineTo(centerx-15+3.75*6, centery+15);
	context.lineTo(centerx-15+3.75*7, centery+10);
	context.lineTo(centerx-15+3.75*8, centery+15);
	context.lineTo(centerx+15, centery);
	context.closePath();
	
	if (id == 0){
		context.strokeStyle = "red";
	}
	else if(id==1){
		context.strokeStyle = "blue";
	}
	else if(id==2){
		context.strokeStyle = "yellow";
	}
	else{
		context.strokeStyle = "green";
	}
	context.stroke();
	
	context.lineWidth = 2;
	context.fill();


	//EYES
	context.beginPath();
	context.arc(centerx-7, centery-5, 4, 0, 2*Math.PI);
	context.arc(centerx+7, centery-5, 4, 0, 2*Math.PI);
	context.fillStyle = "white";
	context.fill();
	context.closePath();

	if(direction == 3){
		// LEFT
		context.beginPath();
		context.arc(centerx+5, centery-5, 2.5, 0, 2*Math.PI);
		context.arc(centerx-9, centery-5, 2.5, 0, 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
	}
	else if(direction == 4){
		// RIGHT
		context.beginPath();
		context.arc(centerx+9, centery-5, 2.5, 0, 2*Math.PI);
		context.arc(centerx-5, centery-5, 2.5, 0, 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
	}
	else if(direction == 2){
		// DOWN
		context.beginPath();
		context.arc(centerx+7, centery-3, 2.5, 0, 2*Math.PI);
		context.arc(centerx-7, centery-3, 2.5, 0, 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
	}
	else if(direction==1){
		// UP
		context.beginPath();
		context.arc(centerx+7, centery-7, 2.5, 0, 2*Math.PI);
		context.arc(centerx-7, centery-7, 2.5, 0, 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
	}
	else{
		context.beginPath();
		context.arc(centerx+7, centery-5, 2.5, 0, 2*Math.PI);
		context.arc(centerx-7, centery-5, 2.5, 0, 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
	}
	

}

function decideMonstersDirection(){
	for (var k = 0; k<num_of_monsters ; k++){
		

		var index_i = Math.floor(monsters[k].i/60);
		var index_j = Math.floor(monsters[k].j/60);
		var found = false;

		while(!found){
			var randomNum = Math.random();
			if (randomNum < 0.25){
				if (board[index_i][index_j-1] != 4){
					monsters[k].direction = 1;
					found = true;
				}
			}
			else if (randomNum >= 0.25 && randomNum < 0.5){
				if (board[index_i][index_j+1] != 4){
					monsters[k].direction = 2;
					found = true;
				}
			}
			else if (randomNum >=0.5 && randomNum<0.75){
				if (board[index_i-1][index_j] != 4){
					monsters[k].direction = 3;
					found = true;
				}
			}
			else {
				if (board[index_i+1][index_j] != 4){
					monsters[k].direction = 4;
					found = true;
				}
			}
		}
	}
}

function moveMonsters(){
	for (var k =0; k<num_of_monsters; k++){
		var monster = monsters[k];
		if (monster.direction == 1){
			// up
			monster.j -= monster.speed;
		}
		else if (monster.direction == 2){
			// down
			monster.j += monster.speed;
		}
		else if (monster.direction == 3){
			// left
			monster.i -= monster.speed;
		}
		else if (monster.direction == 4){
			//right
			monster.i += monster.speed;
		}
	}
}


function resetPositions(){
	board[shape.i][shape.j] = 0;

	// PACMAN:
	var pacman_remain = 1;
	while(pacman_remain>0){
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		shape.direction = 4;
		board[emptyCell[0]][emptyCell[1]] = 2;
		pacman_remain--;
	}

	for (let k=0; k<num_of_monsters; k++){
		if (k==0){
			monsters[k].i = 90;
			monsters[k].j = 90;
		}
		else if(k==1){
			monsters[k].i = 990;
			monsters[k].j = 90;
		}
		else if(k==2){
			monsters[k].i = 990;
			monsters[k].j = 690;
		}
		else if(k==3){
			monsters[k].i = 90;
			monsters[k].j = 690;
		}
		monsters[k].direction = null;
	}
	monster_turn = 12;
	
}

function check_x_and_y(monster_x, monster_y, shape_x, shape_y){
	if (Math.abs(monster_x-shape_x) <= 10){
		if (Math.abs(monster_y-shape_y) <= 10){
			// collistion
			return true;
		}
	}
	return false;
}

function gameCompleted(){
	window.clearInterval(interval);
	window.alert("Game completed");
}

function gameLost(){
	window.clearInterval(interval);
	window.alert("LOSER!!!");
}

function resetKeys(){
	for (var key in keysDown){
		keysDown[key] = false;
	}
}

function drawBall(index_i, index_j, value){
	if (value == 5){
		// draw 5 ball
		context.drawImage(p5BallImg, index_i*60+15, index_j*60+15, 30, 30);
		context.beginPath();
		context.font = "15px Comic Sans MS";
		context.fillStyle = "white";
		context.fillText("5", index_i*60+23, index_j*60+31 + 4);
	}
	else if (value == 15){
		// draw 15 ball
		context.drawImage(p15BallImg, index_i*60+15, index_j*60+15, 30, 30);
		context.beginPath();
		context.font = "16px Comic Sans MS";
		context.fillStyle = "white";
		context.fillText("15", index_i*60+21, index_j*60+31.5 + 4);
	}
	else if (value == 25){
		// draw 25 ball
		context.drawImage(p25BallImg, index_i*60+15, index_j*60+15, 30, 30)
		context.beginPath();
		context.font = "21px Comic Sans MS";
		context.fillStyle = "black";
		context.fillText("25", index_i*60+17, index_j*60+33 + 4);
	}
}