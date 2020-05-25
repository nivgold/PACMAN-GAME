function draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (board[i][j] == 2) { //pacman
				drawPacman(i, j);
			} else if (board[i][j] == 1) { //food
				// drawFoodByImg(i, j, 'yellow', 25);
				drawFood(i, j, 'yellow', 25);
			}
		}
	}
}

function drawPacman(row, col) {
	let center = new Object();
	center.x = col * 40 + 20;
	center.y = row * 40 + 20;
	//body:
	ctx.beginPath();
	if (playerDirection == 'right' || !playerDirection)
		ctx.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	else if (playerDirection == 'up')
		ctx.arc(center.x, center.y, 15, 0, 1.65 * Math.PI); // half circle
	else if (playerDirection == 'left')
		ctx.arc(center.x, center.y, 15, -0.85 * Math.PI, 0.85 * Math.PI);
	else if (playerDirection == 'down')
		ctx.arc(center.x, center.y, 15, 0.35 * Math.PI, 0.65 * Math.PI, true);
	ctx.lineTo(center.x, center.y);
	ctx.fillStyle = 'yellow'; //color
	ctx.fill();

	//eye:
	ctx.beginPath();
	if (playerDirection == 'right' || !playerDirection)
		ctx.arc(center.x + 5, center.y - 10, 3, 0, 2 * Math.PI);
	else if (playerDirection == 'up')
		ctx.arc(center.x - 8, center.y - 6, 3, 0, 2 * Math.PI);
	else if (playerDirection == 'left')
		ctx.arc(center.x - 5, center.y - 10, 3, 0, 2 * Math.PI);
	else if (playerDirection == 'down')
		ctx.arc(center.x + 8, center.y + 6, 3, 0, 2 * Math.PI);

	ctx.fillStyle = 'black';
	ctx.fill();
}


function drawFood(row, col, color, points) {
	let center = new Object();
	center.x = col * 40 + 20;
	center.y = row * 40 + 18;
	ctx.beginPath();
	ctx.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
	ctx.fillStyle = color; //color
	ctx.fill();

	ctx.font = "20px Comic Sans MS";
	ctx.fillStyle = "black";
	ctx.fillText(points, center.x - 11, center.y + 7);
}

function drawFoodByImg(row, col, color, points) {
	let img = document.createElement("img");
	img.src = "../images/powerPellets/" + color + ".png";
	let center = new Object();
	center.x = col * 39.5 + 6;
	center.y = row * 40 + 5;
	img.addEventListener("load", function () {
		ctx.drawImage(img, center.x, center.y, 30, 30);
		ctx.font = "15px Comic Sans MS";
		ctx.fillStyle = "white";
		// ctx.fillText("25", 10, 10+20);
		ctx.fillText(points, center.x +5, center.y +20);
	});
}

function drawGhost(row, col, color,direction) {
	let center = new Object();
	center.x = col * 40 + 20;
	center.y = row * 40 + 18;
	// head:
	ctx.beginPath();
	ctx.arc(center.x, center.y, 15, 0, Math.PI, true);
	ctx.fillStyle = color;
	ctx.fill();
	// body:
	ctx.moveTo(center.x - 15, center.y);
	ctx.lineTo(center.x - 15, center.y + 15);
	ctx.lineTo(center.x - 15 + 3.75, center.y + 10);
	ctx.lineTo(center.x - 15 + 3.75 * 2, center.y + 15);
	ctx.lineTo(center.x - 15 + 3.75 * 3, center.y + 10);
	ctx.lineTo(center.x - 15 + 3.75 * 4, center.y + 15);
	ctx.lineTo(center.x - 15 + 3.75 * 5, center.y + 10);
	ctx.lineTo(center.x - 15 + 3.75 * 6, center.y + 15);
	ctx.lineTo(center.x - 15 + 3.75 * 7, center.y + 10);
	ctx.lineTo(center.x - 15 + 3.75 * 8, center.y + 15);
	ctx.lineTo(center.x + 15, center.y);
	ctx.closePath();
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.lineWidth = 2;
	ctx.fill();
	//eyes:
	drawGhostEyes(center,direction);
}

function drawGhostEyes(center, direction) {
	ctx.beginPath();
	ctx.arc(center.x - 7, center.y - 5, 4, 0, 2 * Math.PI);
	ctx.arc(center.x + 7, center.y - 5, 4, 0, 2 * Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	if (direction == 'left') {
		ctx.arc(center.x + 5, center.y - 5, 2.5, 0, 2 * Math.PI);
		ctx.arc(center.x - 9, center.y - 5, 2.5, 0, 2 * Math.PI);
	}
	else if (direction == 'right') {
		ctx.arc(center.x + 9, center.y - 5, 2.5, 0, 2 * Math.PI);
		ctx.arc(center.x - 5, center.y - 5, 2.5, 0, 2 * Math.PI);
	}
	else if (direction == 'down') {
		ctx.arc(center.x + 7, center.y - 3, 2.5, 0, 2 * Math.PI);
		ctx.arc(center.x - 7, center.y - 3, 2.5, 0, 2 * Math.PI);
	}
	else if (direction == 'up') {
		ctx.arc(center.x + 7, center.y - 7, 2.5, 0, 2 * Math.PI);
		ctx.arc(center.x - 7, center.y - 7, 2.5, 0, 2 * Math.PI);
	}
	else {
		ctx.arc(center.x + 7, center.y - 5, 2.5, 0, 2 * Math.PI);
		ctx.arc(center.x - 7, center.y - 5, 2.5, 0, 2 * Math.PI);
	}
	ctx.fillStyle = "black";
	ctx.fill();
}

function drawGhostByImg(row, col, ghostName) {
	let img = document.createElement("img");
	img.src = "./images/ghosts/" + ghostName + ".png";
	img.addEventListener("load", function () {
		let center = new Object();
		center.x = col * 40;
		center.y = row * 40 - 7;
		ctx.drawImage(img, center.x, center.y, 50, 50);
	});
}