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
var maxTime = 60;
var lives = 5;
var username = "player";
var gameStatus = 0;
//balls
var p5BallImg;
var p15BallImg;
var p25BallImg;
//pacman
shape.speed = 0.5;
//monsters:
var monster_turn = 200;
var num_of_monsters = 4;
var monsters = new Array();
// cherry
var cherry = new Object();
var cherry_turn = 200;
var cherryImg;
// medication
var medication = new Object();
var medicationImg;
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

	// cherry Img
	cherryImg = new Image();
	cherryImg.src = "./cherry/1.png";

	// medication Img
	medicationImg = new Image();
	medicationImg.src = "./medication/1.png";

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
		monsters[k].speed = 0.3;
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
			else if ((i==10 && j==5) || (i==1&&j==9)){
				board[i][j] = 1;
			}
			else{
				board[i][j] = 0;
			}
		}
	}


	// PACMAN:
	while(pacman_remain>0){
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0]*60+30;
		shape.j = emptyCell[1]*60+30;
		shape.direction = 4;
		shape.move = false;
		pacman_remain--;
	}
	
	var shape_index_i = Math.floor(shape.i/60);
	var shape_index_j = Math.floor(shape.j/60);

	//FOOD:
	var p5Ball = 0.6*food_remain;
	var p15Ball = 0.3*food_remain;
	var p25Ball = food_remain - (p5Ball + p15Ball);

	while( p5Ball > 0){
		var emptyCell = findRandomEmptyCell(board);
		while(emptyCell[0] == shape_index_i && emptyCell[1] == shape_index_j){
			emptyCell = findRandomEmptyCell(board);
		}
		board[emptyCell[0]][emptyCell[1]] = 5;
		p5Ball--;
	}
	while( p15Ball > 0){
		var emptyCell = findRandomEmptyCell(board);
		while(emptyCell[0] == shape_index_i && emptyCell[1] == shape_index_j){
			emptyCell = findRandomEmptyCell(board);
		}
		board[emptyCell[0]][emptyCell[1]] = 15;
		p15Ball--;
	}
	while( p25Ball > 0){
		var emptyCell = findRandomEmptyCell(board);
		while(emptyCell[0] == shape_index_i && emptyCell[1] == shape_index_j){
			emptyCell = findRandomEmptyCell(board);
		}
		board[emptyCell[0]][emptyCell[1]] = 25;
		p25Ball--;
	}

	// cherry
	var cherry_remain = 1;
	while(cherry_remain > 0){
		var emptyCell = findRandomEmptyCell(board);
		while(emptyCell[0] == shape_index_i && emptyCell[1] == shape_index_j){
			emptyCell = findRandomEmptyCell(board);
		}
		cherry.i = emptyCell[0]*60 + 15;
		cherry.j = emptyCell[1]*60 + 15;
		cherry.speed = 0.1;
		cherry_remain--;
		cherry.eaten = false;
	}

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

	interval = setInterval(UpdatePosition, 1);
	setInterval(function(){maxTime--}, 1000);

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
	lblTime.value = maxTime;
	lblLives.value = lives;
	lblName.value = username;

	drawCanvas();

	for (var i = 0; i < 18; i++) {
		for (var j = 0; j < 13; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			//DRAW MEDICATION
			if (board[i][j] == 1){
				drawMedication(i, j);
			}

			if (board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25) {
				drawBall(i, j, board[i][j]);
				
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

	drawPacman(shape.i, shape.j, shape.direction);

	// draw all the monsters
	for (var k =0 ; k<num_of_monsters; k++){
		var monster = monsters[k];
		drawMonster(monster.i, monster.j, monster.direction, k);
	}

	if (!cherry.eaten)
		drawCherry();
}

function UpdatePosition() {
	if (gameStatus == 1){
		// game lost because of lives
		gameLost();
		return;
	}
	else if (gameStatus == 2){
		// won game
		gameCompleted();
		return;
	}
	else if (gameStatus == 3){
		// game lost because of time
		gameLostScore();
		return; 
	}

	var x = GetKeyPressed();
	if (isInMiddle()){
		if (x == 1) {
			shape.move = true;
			shape.direction = x;
		}
		else if (x == 2) {
			shape.move = true;
			shape.direction = x;
		}
		else if (x == 3) {
			shape.move = true;
			shape.direction = x;
		}
		else if (x == 4) {
			shape.move = true;
			shape.direction = x;
		}
	}
	movePacman();
	

	// check if food:
	if (board[Math.floor(shape.i/60)][Math.floor(shape.j/60)] >= 5) {
		if (isInMiddle()){
			score+=board[Math.floor(shape.i/60)][Math.floor(shape.j/60)];
			board[Math.floor(shape.i/60)][Math.floor(shape.j/60)] = 0;
		}
	}

	// MONSTERS
	if (monster_turn == 0){
		decideMonstersDirection();
		monster_turn=200;
	}
	monster_turn--;
	moveMonsters();

	// cherry
	if (cherry_turn == 0){
		decideCherryDirection();
		cherry_turn = 600;
	}
	cherry_turn--;
	moveCherry();

	// check if monster:
	for (var k =0; k<num_of_monsters; k++){
		var currentMonster = monsters[k];
		if (check_x_and_y(currentMonster.i, currentMonster.j, shape.i, shape.j)){
			if (lives == 1){
				lives--;
				score -= 10;
				gameStatus = 1;
			}
			else{
				resetKeys();
				score-=10;
				lives--;
				window.alert("lost live");
				resetPositions();
			}
		}
	}

	// check if cherry:
	if (!cherry.eaten){
		if (check_x_and_y(cherry.i+15, cherry.j+15, shape.i, shape.j)){
			score += 50;
			cherry.eaten = true;
		}
	}

	// check if medication:
	checkMedication();



	var currentTime = new Date();
	time_elapsed = maxTime - ((currentTime - start_time) / 1000);


	// TIME's UP?
	if (maxTime <= 0){
		lblTime.value = 0;
		Draw();
		if (score >= 100){
			gameStatus = 2;
		}
		else {
			gameStatus = 3;
		}
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

	else{
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

function drawCherry(){
	context.drawImage(cherryImg, cherry.i, cherry.j, 30, 30);
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
		var monster_index_i = Math.floor(monsters[k].i/60);
		var monster_index_j = Math.floor(monsters[k].j/60);
		var shape_index_i = Math.floor(shape.i/60);
		var shape_index_j = Math.floor(shape.j/60);
		var minHeuristic = 999999;
		var minDirection;
		// try LEFT
		if (board[monster_index_i-1][monster_index_j] != 4){
			// calculate manhattan distance
			var manhattan = Math.abs(monster_index_i-1 - shape_index_i) + Math.abs(monster_index_j - shape_index_j);
			if (manhattan < minHeuristic){
				minHeuristic = manhattan;
				minDirection = 3;
			}
		}
		// try UP
		if (board[monster_index_i][monster_index_j-1] != 4){
			// calculate manhattan distance
			var manhattan = Math.abs(monster_index_i - shape_index_i) + Math.abs(monster_index_j-1 - shape_index_j);
			if (manhattan < minHeuristic){
				minHeuristic = manhattan;
				minDirection = 1;
			}
		}
		// try RIGHT
		if (board[monster_index_i+1][monster_index_j] != 4){
			// calculate manhattan distance
			var manhattan = Math.abs(monster_index_i+1 - shape_index_i) + Math.abs(monster_index_j - shape_index_j);
			if (manhattan < minHeuristic){
				minHeuristic = manhattan;
				minDirection = 4;
			}
		}
		// try DOWN
		if (board[monster_index_i][monster_index_j+1] != 4){
			// calculate manhattan distance
			var manhattan = Math.abs(monster_index_i - shape_index_i) + Math.abs(monster_index_j+1 - shape_index_j);
			if (manhattan < minHeuristic){
				minHeuristic = manhattan;
				minDirection = 2;
			}
		}
		monsters[k].direction = minDirection;
	}
}

function decideCherryDirection(){
	var index_i = Math.floor(cherry.i/60);
	var index_j = Math.floor(cherry.j/60);
	var found = false;
	while(!found){
		var randomNum = Math.random();
		if (randomNum<0.25){
			if (board[index_i][index_j-1] != 4){
				cherry.direction = 1;
				found = true;
			}
		}
		else if (randomNum >= 0.25 && randomNum<0.5){
			if (board[index_i][index_j+1] != 4){
				cherry.direction = 2;
				found = true;
			}
		}
		else if (randomNum >=0.5 && randomNum<0.75){
			if (board[index_i-1][index_j] != 4){

				cherry.direction = 3;
				found = true;
			}
		}
		else{
			if (board[index_i+1][index_j] != 4){
				cherry.direction = 4;
				found = true;
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

function moveCherry(){
	if (cherry.direction == 1){
		// UP
		cherry.j -= cherry.speed;
	}
	else if (cherry.direction == 2){
		// DOWN
		cherry.j += cherry.speed;
	}
	else if (cherry.direction == 3){
		// LEFT
		cherry.i -= cherry.speed;
	}
	else if (cherry.direction == 4){
		// RIGHT
		cherry.i += cherry.speed;
	}
}

function movePacman(){
	if(shape.move){
		var indexi;
		var indexj;
		// UP
		if (shape.direction == 1){
			indexi = Math.floor(shape.i/60);
			indexj = Math.floor((shape.j-30.5)/60);
			if(board[indexi][indexj] != 4){
				shape.j -= shape.speed;
			}
		}
		// DOWN
		else if (shape.direction == 2){
			indexi = Math.floor(shape.i/60);
			indexj = Math.floor((shape.j+30)/60);
			if (board[indexi][indexj] != 4){
				shape.j += shape.speed;
			}
		}
		// LEFT
		else if (shape.direction == 3){
			indexi = Math.floor((shape.i-30.5)/60);
			indexj = Math.floor(shape.j/60);
			if (board[indexi][indexj] != 4){
				shape.i -= shape.speed;
			}
		}
		// RIGHT
		else if (shape.direction == 4){
			indexi = Math.floor((shape.i+30)/60);
			indexj = Math.floor(shape.j/60);
			if(board[indexi][indexj] != 4){
				shape.i += shape.speed;
			}
		}
	}
}


function resetPositions(){
	// PACMAN:
	var pacman_remain = 1;
	while(pacman_remain>0){
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0]*60+30;
		shape.j = emptyCell[1]*60+30;
		shape.direction = 4;
		shape.move = false;
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
	window.alert("Winner!!!");
}

function gameLost(){
	window.clearInterval(interval);
	window.alert("LOSER!!!");
}

function gameLostScore(){
	window.clearInterval(interval);
	window.alert("You are better than "+score+" points!")
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

function isInMiddle(){
	var i_index = Math.floor(shape.i/60);
	var j_index = Math.floor(shape.j/60);

	var middle_i = parseInt(i_index * 60 + 30);
	var middle_j = parseInt(j_index * 60 + 30);

	if (shape.i == middle_i && shape.j == middle_j){
		return true;
	}
	return false;
}

function drawMedication(i, j){
	i_pixel = i*60;
	j_pixel = j*60;

	context.drawImage(medicationImg, i_pixel+15, j_pixel+7.5, 30, 45);
}

function checkMedication(){
	var index_i;
	var index_j;
	index_i = Math.floor(shape.i/60);
	index_j = Math.floor(shape.j/60);
	
	if (board[index_i][index_j] == 1){
		var medication_i = index_i*60 +30;
		var medication_j = index_j*60 +30;
		if (Math.abs(shape.i - medication_i)<=10 && Math.abs(shape.j - medication_j)<=10){
			if (lives < 5){
				lives++;
				board[index_i][index_j] = 0;
			}
		}
	
	}
}