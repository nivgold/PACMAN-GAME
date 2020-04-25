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
var lives = 3;
//monsters:
var monsters = new Array();
//END OF SETTINGS
//////////////////////////////////

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});


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

	//MONSTER:
	var num_of_monsters = 1;
	for (let k=0; k<num_of_monsters; k++){
		monsters[k] = new Object();
		if (k==0){
			monsters[k].i = 0;
			monsters[k].j = 0;
		}
		else if(k==1){
			monsters[k].i = 17;
			monsters[k].j = 0;
		}
		else if(k==2){
			monsters[k].i = 17;
			monsters[k].j = 12;
		}
		else if(k==3){
			monsters[k].i = 0;
			monsters[k].j = 12;
		}
		monsters[k].speed = 15;
	}

	for (var m=0; m<18; m++){
		board[m] = new Array();
	}

	// PUTTING THE MONSTERS ON THE BOARD
	for (var k = 0; k<num_of_monsters; k++){
		var index_i = monsters[k].i;
		var index_j = monsters[k].j;
		var value = -k-1;
		board[index_i][index_j] = value;
	}

	//END OF SETTINGS
	///////////////

	
	for (var i = 0; i < 18; i++) {
		//board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
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
			else if (board[i][j] < 0){
				// monster over here
			}
			else {
				var randomNum = Math.random();
				//FOOD:
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} 
				//PACMANS:
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				}
				 else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	//FOOD:
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
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

	interval = setInterval(UpdatePosition, 50);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
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

	drawCanvas();

	for (var i = 0; i < 18; i++) {
		for (var j = 0; j < 13; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;


			// DRAW MONSTER
			if(board[i][j] < 0){
				var value = board[i][j];
				var id = -value-1;
				drawMonster(center.x, center.y, 5, id);
			}

			//DRAW PACMAN
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y,  15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 10, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();

			} 
			//DRAW FOOD
			else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = "white"; //color
				context.fill();

				context.font = "10px Comic Sans MS";
				context.fillStyle = "red";
				context.fillText("1", center.x -2.5, center.y + 4);
				
			} 
			//DRAW WALL
			else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "blue"; //color
				context.fill();
			}

			// DRAW MONSTER
			if(board[i][j] < 0){
				var value = board[i][j];
				var id = -value-1;
				drawMonster(center.x, center.y, 5, id);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 12 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 17 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
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
		Draw();
	}
}

function drawCanvas(){
	canvas = document.getElementById('canvas');
	canvas.heigth = 780;
	canvas.weight = 1080;
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
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

	if(direction == 4){
		// LEFT
		context.beginPath();
		context.arc(centerx+5, centery-5, 2.5, 0, 2*Math.PI);
		context.arc(centerx-9, centery-5, 2.5, 0, 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
	}
	else if(direction == 6){
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
	else if(direction==8){
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