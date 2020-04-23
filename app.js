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

//DRAWING:
function monster_drawing() {
	let cent = 210;// 60*position
	//MONSTER:
	context.beginPath();
	context.moveTo(cent - 20, cent - 10);
	context.lineTo(cent - 20, cent + 15);
	context.lineTo(cent - 15, cent + 10);
	context.lineTo(cent - 10, cent + 15);
	context.lineTo(cent - 5, cent + 10);
	context.lineTo(cent, cent + 15);
	context.lineTo(cent + 5, cent + 10);
	context.lineTo(cent + 10, cent + 15);
	context.lineTo(cent + 15, cent + 10);
	context.lineTo(cent + 20, cent + 15);
	context.lineTo(cent + 20, cent - 10);
	context.lineWidth = 2;
	context.fillStyle = "red";
	context.fill();
	context.beginPath();
	context.arc(cent, cent - 5, 20, 0, Math.PI, true);
	context.fillStyle = "red";
	context.fill();
	context.beginPath();
	context.fillStyle = "white";
	context.arc(cent - 10, cent - 10, 4, 0, 2 * Math.PI);
	context.arc(cent + 10, cent - 10, 4, 0, 2 * Math.PI);
	context.fill();

	//MONSTER - EYE:
	context.beginPath();
	context.fillStyle = "black";
	context.arc(cent - 12, cent - 10, 2, 0, 2 * Math.PI);
	context.arc(cent + 8, cent - 10, 2, 0, 2 * Math.PI);
	context.fill();
}


$(document).ready(function () {
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
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;

	//MONSTER:
	var num_of_monsters = 4;
	for (let k=0; k<num_of_monsters; k++){
		monsters[k] = new Object();
		if (k==0){
			monsters[k].i = 0;
			monsters[k].j = 0;
		}
		else if(k==1){
			monsters[k].i = 9;
			monsters[k].j = 0;
		}
		else if(k==2){
			monsters[k].i = 9;
			monsters[k].j = 9;
		}
		else if(k==3){
			monsters[k].i = 0;
			monsters[k].j = 9;
		}
		monsters[k].speed = 15;
	}

	//END OF SETTINGS
	///////////////

	start_time = new Date();
	keys.setDefualt();

	for (var m=0; m<10; m++){
		board[m] = new Array();
	}

	// PUTTING THE MONSTERS ON THE BOARD
	for (var k = 0; k<num_of_monsters; k++){
		var index_i = monsters[k].i;
		var index_j = monsters[k].j;
		var value = -k-1;
		board[index_i][index_j] = value;
	}

	

	for (var i = 0; i < 10; i++) {
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {

			//WALLS:
			if (
				(i == 1 && j == 1) ||
				(i == 2 && j == 1) ||
				(i == 3 && j == 1) ||
				(i == 4 && j == 1) ||
				(i == 6 && j == 1) ||
				(i == 7 && j == 1) ||
				(i == 8 && j == 1) ||
				(i == 3 && j == 2) ||
				(i == 4 && j == 2) ||
				(i == 0 && j == 3) ||
				(i == 1 && j == 3) ||
				(i == 6 && j == 3) ||
				(i == 8 && j == 3) ||
				(i == 9 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 4 && j == 4) ||
				(i == 5 && j == 4) ||
				(i == 6 && j == 4) ||
				(i == 0 && j == 5) ||
				(i == 1 && j == 5) ||
				(i == 3 && j == 5) ||
				(i == 4 && j == 5) ||
				(i == 5 && j == 5) ||
				(i == 6 && j == 5) ||
				(i == 8 && j == 5) ||
				(i == 9 && j == 5) ||
				(i == 1 && j == 6) ||
				(i == 6 && j == 6) ||
				(i == 8 && j == 6) ||
				(i == 3 && j == 7) ||
				(i == 4 && j == 7) ||
				(i == 1 && j == 8) ||
				(i == 2 && j == 8) ||
				(i == 3 && j == 8) ||
				(i == 4 && j == 8) ||
				(i == 6 && j == 8) ||
				(i == 7 && j == 8) ||
				(i == 8 && j == 8) 
			) {
				board[i][j] = 4;
				
			}
			else if (board[i][j] < 0){
				// monster over here
			}
			else{
				//FOOD:
				var randomNum = Math.random();
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




	//GAME KEYS:
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


	// SETTING THE INTERVAL
	interval = setInterval(UpdatePosition, 300);


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
	if (keysDown[keys.key_up]) {
		return 1;
	}
	//DOWN
	if (keysDown[keys.key_Down]) {
		return 2;
	}
	//LEFT
	if (keysDown[keys.key_Left]) {
		return 3;
	}
	//RIGHT
	if (keysDown[keys.key_right]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives;

	drawCanvas();

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
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
		}
	}
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	//UP
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	//DOWN
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	//LEFT
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	//RIGHT
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	// PACMAN EAT FOOD
	if (board[shape.i][shape.j] == 1) {
		score++;
	}

	board[shape.i][shape.j] = 2;


	

	
	// MOVE MONSTERS

	for(let k=0; k<monsters.length; k++){
		var index_i = monsters[k].i;
		var index_j = monsters[k].j;
		var value = -k-1;
		// clean the last position the monster was
		board[index_i][index_j] = 0;
		if (index_i < shape.i){
			// monster need to move right
			if (index_i<9 && board[index_i+1][index_j] != 4 && board[index_i+1][index_j]>=0){
				monsters[k].i++;
				index_i++;
			}
			// cant move right

			else if(index_j < shape.j){
				// monster need to move down
				if (index_j<9 && board[index_i][index_j+1] != 4 && board[index_i][index_j+1]>=0){
					monsters[k].j++;
					index_j++;
				}
			}
			else if(index_j > shape.j){
				// monster need to move up
				if (index_j>0  && board[index_i][index_j-1] != 4 && board[index_i][index_j-1]>=0){
					monsters[k].j--;
					index_j--;
				}
				else{
					// try left
					if(index_i > 0 && board[index_i-1][index_j] != 4 && board[index_i-1][index_j]>=0){
						monsters[k].i--;
						index_i--;
					}
					// try down
					else{
						monsters[k].j++;
						index_j++;
					}
				}
			}
			else{
				// index_j == shape.j -> try down/up/left

				//down
				if (index_j<9 && board[index_i][index_j+1] != 4 && board[index_i][index_j+1]>=0){
					monsters[k].j++;
					index_j++;
				}
				// up
				else if (index_j>0 && board[index_i][index_j-1] != 4 && board[index_i][index_j-1]>=0){
					monsters[k].j--;
					index_j--;
				}
				// left
				else{
					monsters[k].i--;
					index_i--;
				}
			}
		}
		else if(index_i > shape.i){
			// monster need to move left
			if(index_i>0 && board[index_i-1][index_j] != 4 && board[index_i-1][index_j]>=0){
				monsters[k].i--;
				index_i--;
			}
			// cant move left

			else if(index_j < shape.j){
				// monster need to move down
				if (index_j<9 && board[index_i][index_j+1] != 4 && board[index_i][index_j+1]>=0){
					monsters[k].j++;
					index_j++;
				}
			}
			else if(index_j > shape.j){
				// monster need to move up
				if (index_j>0  && board[index_i][index_j-1] != 4 && board[index_i][index_j-1]>=0){
					monsters[k].j--;
					index_j--;
				}
				else{
					// try right
					if(index_i < 9 && board[index_i+1][index_j] != 4 && board[index_i+1][index_j]>=0){
						monsters[k].i++;
						index_i++;
					}
					// try down
					else{
						monsters[k].j++;
						index_j++;
					}
				}
			}
			else{
				// index_j == shape.j -> try down/up/right

				//down
				if (index_j<9 && board[index_i][index_j+1] != 4 && board[index_i][index_j+1]>=0){
					monsters[k].j++;
					index_j++;
				}
				// up
				else if (index_j>0 && board[index_i][index_j-1] != 4 && board[index_i][index_j-1]>=0){
					monsters[k].j--;
					index_j--;
				}
				// right
				else{
					monsters[k].i++;
					index_i++;
				}
			}
		}
		else{
			// monster and pacman are at the same column (index.i == shape.i)
			
			if (index_j > shape.j){
				// monster need to move up
				if( index_j>0 && board[index_i][index_j-1] != 4 && board[index_i][index_j-1] >=0){
					monsters[k].j--;
					index_j--;
				}
				// cant move up

				// try right/left/down
				
				// right
				if (index_i<9 && board[index_i+1][index_j] != 4 && board[index_i+1][index_j]>=0){
					monsters[k].i++;
					index_i++;
				}
				// left
				if (index_i>0 && board[index_i-1][index_j] != 4 && board[index_i-1][index_j]>=0){
					monsters[k].i--;
					index_i--;
				}
				//down
				else{
					monsters[k].j++;
					index_j++;
				}
			}
			else if(index_j < shape.j){
				// monster need to move down
				if (index_j<9 && board[index_i][index_j+1] != 4 && board[index_i][index_j+1]>=0){
					monsters[k].j++;
					index_j++;
				}
				//cant move down
				
				//try right/left/up
				// right
				if (index_i<9 && board[index_i+1][index_j] != 4 && board[index_i+1][index_j]>=0){
					monsters[k].i++;
					index_i++;
				}
				// left
				if (index_i>0 && board[index_i-1][index_j] != 4 && board[index_i-1][index_j] >=0){
					monsters[k].i--;
					index_i--;
				}
				// up
				else{
					monsters[k].j--;
					index_j--;
				}
			}
			else{
				// the monster and the pacman are at the same position
				alert("MONSTER COUGTH PACMAN");
				drawCanvas();
				lives--;
				Start();
			}
		}
		board[index_i][index_j] = value;
	}



	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} 
	else {
		Draw();
	}
}



function drawCanvas(){
	canvas = document.getElementById('canvas');
	canvas.heigth = 600;
	canvas.weight = 600;
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