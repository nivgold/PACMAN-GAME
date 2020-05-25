function createEmptyMaze() {
	for (var row = 0; row < rows; row++) {
		board[row] = new Array();
		for (var col = 0; col < cols; col++) {
			board[row][col] = 0;
		}
	}
}

function setWalls() {
	// frame:
	for (var col = 0; col < 18; col++)
		setWall(0, col);

	for (var col = 0; col < 18; col++)
		setWall(12, col);

	for (var row = 1; row < 12; row++) {
		if (row != 6)
			setWall(row, 0);
	}
	for (var row = 1; row < 12; row++) {
		if (row != 6)
			setWall(row, 17);
	}
	// by rows:
	for (var col = 4; col < 14; col++) {
		if (col == 4 || col == 13)
			setWall(1, col);
	}
	for (var col = 2; col < 16; col++) {
		if (col == 2 || col == 6 || col == 7 || col == 10 || col == 11 || col == 15)
			setWall(2, col);
	}
	for (var col = 2; col < 16; col++) {
		if (col == 2 || col == 3 || col == 5 || col == 12 || col == 14 || col == 15)
			setWall(3, col);
	}
	for (var col = 2; col < 16; col++) {
		if (col == 3 || col == 7 || col == 10 || col == 14)
			setWall(4, col);
	}
	for (var col = 1; col < 17; col++) {
		if (col == 1 || col == 3 || col == 4 || col == 6 || col == 11 || col == 13 || col == 14 || col == 16)
			setWall(5, col);
	}
	for (var col = 6; col < 12; col++)
		setWall(6, col);
	for (var col = 1; col < 17; col++) {
		if (col == 1 || col == 3 || col == 4 || col == 13 || col == 14 || col == 16)
			setWall(7, col);
	}
	for (var col = 1; col < 17; col++)
		if (col == 1 || col == 3 || col == 4 || col == 5 || col == 6 || col == 7 || col == 10 || col == 11 || col == 12 || col == 13 || col == 14 || col == 16)
			setWall(8, col);

	for (var col = 2; col < 16; col++) {
		if (col == 2 || col == 7 || col == 8 || col == 9 || col == 10 || col == 15)
			setWall(10, col);
	}

	for (var col = 4; col < 14; col++) {
		if (col == 4 || col == 5 || col == 12 || col == 13) {
			setWall(9, col);
			setWall(11, col);
		}
	}
}

function setWall(row, col) {
	this.board[row][col] = 4;
	// drawGhost(row,col, 'blinky');
}

function isEmpty(row, col) {
	return (board[row][col] == 0);
}

function random(bound) {
	return Math.floor(Math.random() * bound);
}

function getEmptyCell() {
	let row = random(rows);
	let col = random(cols);
	while (!isEmpty(row, col)) {
		row = random(rows);
		col = random(cols);
	}
	return [row, col];
}

function putFoodRandomaly() {
	let cell = getEmptyCell();
	let row;
	let col;
	while (food_remain > 0) {
		cell = getEmptyCell();
		row = cell[0];
		col = cell[1];
		board[row][col] = 1;
		food_remain--;
	}
}
