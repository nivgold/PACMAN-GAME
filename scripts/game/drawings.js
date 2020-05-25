function draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_left;


	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			//DRAW MEDICATION
			if (board[i][j] == 1){
				drawMedication(i, j);
			}
			// DRAW CLOCK
			else if (board[i][j] == 2){
				drawClock(i,j);
			}
			// FOOD
			if (board[i][j] == 5) {
				// drawFoodByImg(i, j, 'yellow', 25);
				drawFood(j, i, 7, p5Color, '5', 11);
			}
			else if (board[i][j] == 15) {
				// drawFoodByImg(i, j, 'yellow', 25);
				drawFood(j, i, 10, p15Color, '15', 14);
			}
			else if (board[i][j] == 25) {
				// drawFoodByImg(i, j, 'yellow', 25);
				drawFood(j, i, 12, p25Color, '25', 16);
			}
		}
	}

	

	// draw all the monsters
	for (var k =0 ; k<num_of_monsters; k++){
		var monster = monsters[k];
		drawGhost(monster, k);
	}

	// DRAW PACMAN
	var shape_indexes = getIndexes(shape.i, shape.j);
	drawPacman(shape_indexes[0], shape_indexes[1]);

	// DRAW CHERRY
	if (!cherry.eaten)
		drawCherry();
}

function getCenter(row,col){
	let center = new Object();
	center.x = col * 40 + 20;
	center.y = row * 40 + 20;
	return center;
}

function drawPacman(row, col) {
	//body:
	ctx.beginPath();
	if (shape.direction == 'right' || !shape.direction){
		if (shape.mouth == "open"){
			ctx.arc(shape.i, shape.j, 10, 0.15 * Math.PI, 1.85 * Math.PI);
			ctx.lineTo(shape.i, shape.j);
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
		}
		else{
			ctx.arc(shape.i, shape.j, 10, 0, 2*Math.PI);
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
			// mouth
			ctx.beginPath();
			ctx.moveTo(shape.i+3, shape.j);
			ctx.lineTo(shape.i+10, shape.j);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.stroke();
		}
	}
	else if (shape.direction == 'up'){
		if (shape.mouth == "open"){
			ctx.arc(shape.i, shape.j,  10, -0.35*Math.PI, 1.35 * Math.PI);
			ctx.lineTo(shape.i, shape.j);
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
		}
		else{
			ctx.arc(shape.i, shape.j, 10, 0, 2*Math.PI);
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
			// mouth
			ctx.beginPath();
			ctx.moveTo(shape.i, shape.j-3);
			ctx.lineTo(shape.i, shape.j-10);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.stroke();
		}
	}
	else if (shape.direction == 'left'){
		if (shape.mouth == "open"){
			ctx.arc(shape.i, shape.j, 10, -0.85 * Math.PI, 0.85 * Math.PI);
			ctx.lineTo(shape.i, shape.j);
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
		}
		else{
			ctx.arc(shape.i, shape.j, 10, 0, 2*Math.PI);
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
			// mouth
			ctx.beginPath();
			ctx.moveTo(shape.i-3, shape.j);
			ctx.lineTo(shape.i-10, shape.j);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.stroke();
		}
	}
	else if (shape.direction == 'down'){
		if (shape.mouth == "open"){
			ctx.arc(shape.i, shape.j, 10, 0.35 * Math.PI, 0.65 * Math.PI, true);
			ctx.lineTo(shape.i, shape.j);
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
		}
		else{
			ctx.arc(shape.i, shape.j, 10, 0, 2*Math.PI);
			
			ctx.fillStyle = 'yellow'; //color
			ctx.fill();
			// mouth
			ctx.beginPath();
			ctx.moveTo(shape.i, shape.j+3);
			ctx.lineTo(shape.i, shape.j+10);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.stroke();
		}
	}

	//eye:
	ctx.beginPath();
	if (shape.direction == 'right' || !shape.direction)
		ctx.arc(shape.i + 3, shape.j - 7, 2, 0, 2 * Math.PI);
	else if (shape.direction == 'up')
		ctx.arc(shape.i - 5, shape.j - 4, 2, 0, 2 * Math.PI);
	else if (shape.direction == 'left')
		ctx.arc(shape.i - 3, shape.j - 7, 2, 0, 2 * Math.PI);
	else if (shape.direction == 'down')
		ctx.arc(shape.i - 5, shape.j + 4, 2, 0, 2 * Math.PI);

	ctx.fillStyle = 'black';
	ctx.fill();

}


function drawFood(row, col, size, color, points, font_size) {
	let center = getCenter(row,col);
	ctx.beginPath();
	ctx.arc(center.x, center.y, size, 0, 2 * Math.PI); // circle
	ctx.fillStyle = color; //color
	ctx.fill();

	ctx.font = font_size+"px Comic Sans MS";
	ctx.fillStyle = "black";
	if (points == 5){
		ctx.fillText(points, center.x - 3.5, center.y + 3.5);
	}
	else if(points == 15){
		ctx.fillText(points, center.x - 7, center.y + 6);
	}
	else if (points == 25){
		ctx.fillText(points, center.x - 10, center.y + 6);
	}
}

function drawFoodByImg(row, col, color, points) {
	let img = document.createElement("img");
	img.src = "../images/powerPellets/" + color + ".png";
	let center = getCenter(row,col);
	img.addEventListener("load", function () {
		ctx.drawImage(img, center.x-15, center.y, 30, 30);
		ctx.font = "15px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.fillText("25", 10, 10+20);
		ctx.fillText(points, center.x-10, center.y +20);
	});
}

function drawGhost(monster, id) {
	var color;
	if (id == 0)
		color = "red";
	else if (id == 1)
		color = "blue";
	else if (id ==2)
		color = "orange";
	else if (id == 3)
		color = "pink";

	// head:
	ctx.beginPath();
	ctx.arc(monster.i, monster.j, 10, 0, Math.PI, true);
	ctx.fillStyle = color;
	ctx.fill();
	// body:
	ctx.moveTo(monster.i - 10, monster.j);
	ctx.lineTo(monster.i - 10, monster.j + 10);
	ctx.lineTo(monster.i - 10 + 2.5, monster.j + 5);
	ctx.lineTo(monster.i - 10 + 2.5 * 2, monster.j + 10);
	ctx.lineTo(monster.i - 10 + 2.5 * 3, monster.j + 5);
	ctx.lineTo(monster.i - 10 + 2.5 * 4, monster.j + 10);
	ctx.lineTo(monster.i - 10 + 2.5 * 5, monster.j + 5);
	ctx.lineTo(monster.i - 10 + 2.5 * 6, monster.j + 10);
	ctx.lineTo(monster.i - 10 + 2.5 * 7, monster.j + 5);
	ctx.lineTo(monster.i - 10 + 2.5 * 8, monster.j + 10);
	ctx.lineTo(monster.i + 10, monster.j);
	ctx.closePath();
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.fill();
	//eyes:
	drawGhostEyes(monster);
}

function drawGhostEyes(monster) {
	ctx.beginPath();
	ctx.arc(monster.i - 5, monster.j - 5, 8/3, 0, 2 * Math.PI);
	ctx.arc(monster.i + 5, monster.j - 5, 8/3, 0, 2 * Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	if (monster.direction == 'left') {
		ctx.arc(monster.i + 3, monster.j - 5, 5/3, 0, 2 * Math.PI);
		ctx.arc(monster.i - 7, monster.j - 5, 5/3, 0, 2 * Math.PI);
	}
	else if (monster.direction == 'right') {
		ctx.arc(monster.i + 7, monster.j - 5, 5/3, 0, 2 * Math.PI);
		ctx.arc(monster.i - 3, monster.j - 5, 5/3, 0, 2 * Math.PI);
	}
	else if (monster.direction == 'down') {
		ctx.arc(monster.i + 5, monster.j - 2.5, 5/3, 0, 2 * Math.PI);
		ctx.arc(monster.i - 5, monster.j - 2.5, 5/3, 0, 2 * Math.PI);
	}
	else if (monster.direction == 'up') {
		ctx.arc(monster.i + 5, monster.j - 6.5, 5/3, 0, 2 * Math.PI);
		ctx.arc(monster.i - 5, monster.j - 6.5, 5/3, 0, 2 * Math.PI);
	}
	else {
		ctx.arc(monster.i + 5, monster.j - 5, 5/3, 0, 2 * Math.PI);
		ctx.arc(monster.i - 5, monster.j - 5, 5/3, 0, 2 * Math.PI);
	}
	ctx.fillStyle = "black";
	ctx.fill();
}

function drawGhostByImg(row, col, ghostName) {
	let img = document.createElement("img");
	img.src = "./images/ghosts/" + ghostName + ".png";
	img.addEventListener("load", function () {
		let center = getCenter(row,col);
		
		// center.x = col * 40;
		// center.y = row * 40 - 7;
		ctx.drawImage(img, center.x-25, center.y-20, 50, 50);
	});
}

function drawCherry(){
	ctx.drawImage(cherryImg, cherry.i, cherry.j, 20, 20);
}

function drawMedication(i, j){
	i_pixel = i*40;
	j_pixel = j*40;
	ctx.drawImage(medicationImg, i_pixel+10, j_pixel+5, 20, 30);
}

function drawClock(i, j){
	i_pixel = i*40;
	j_pixel = j*40;
	ctx.drawImage(clockImg, i_pixel, j_pixel, 40, 40);
}