function createEmptyMaze() {
	
	for (var col = 0; col < cols; col++) {
		board[col] = new Array();
		for (var row = 0; row < rows; row++) {
			board[col][row] = 0;
		}
	}
}

function setWalls() {
	for (var col = 0; col < 18; col++)
		setWall(0, col);

	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 4 || col == 13 || col == 17)
			setWall(1, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 2 || col == 6 || col == 7 || col == 10 || col == 11 || col == 15 || col == 17)
			setWall(2, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 2 || col == 3 || col == 5 || col == 12 || col == 14 || col == 15 || col == 17)
			setWall(3, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 3 || col == 7 || col == 10 || col == 14 || col == 17)
			setWall(4, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 1 || col == 3 || col == 4 || col == 6 || col == 11 || col == 13 || col == 14 || col == 16 || col == 17)
			setWall(5, col);
	}
	for (var col = 6; col < 12; col++) {
		setWall(6, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 1 || col == 3 || col == 4 || col == 13 || col == 14 || col == 16 || col == 17)
			setWall(7, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 1 || col == 3 || col == 4 || col == 5 || col == 6 || col == 7 || col == 10 || col == 11 || col == 12 || col == 13 || col == 14 || col == 16 || col == 17)
			setWall(8, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 4 || col == 5 || col == 12 || col == 13 || col == 17)
			setWall(9, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 2 || col == 7 || col == 8 || col == 9 || col == 10 || col == 15 || col == 17)
			setWall(10, col);
	}
	for (var col = 0; col < 18; col++) {
		if (col == 0 || col == 4 || col == 5 || col == 12 || col == 13 || col == 17)
			setWall(11, col);
	}
	for (var col = 0; col < 18; col++)
		setWall(12, col);
}

function setWall(row, col) {
	this.board[col][row] = 4;
}

function isEmpty(row, col) {
	return (board[col][row] == 0);
}

function isBesideMonster(row, col){
	// check left up
	if (getManhattanDistance(row, col, 1, 1) <= 4){
		return true;
	}
	// check left down
	if (getManhattanDistance(row, col, 11, 1) <= 4){
		return true;
	}
	// check right up
	if (getManhattanDistance(row, col, 1, 16) <= 4){
		return true;
	}
	// check right down
	if (getManhattanDistance(row, col, 11, 16) <= 4){
		return true;
	}
	return false;
}

function isCloseToMonster(){
	var shape_indexes = getIndexes(shape.i, shape.j);
	// check left up
	if (getManhattanDistance(1,1,shape_indexes[0],shape_indexes[1]) <= 4){
		return true;
	}
	// check left down
	if (getManhattanDistance(16, 1, shape_indexes[0], shape_indexes[1]) <= 4){
		return true;
	}
	// check right up
	if (getManhattanDistance(16, 11, shape_indexes[0], shape_indexes[1]) <= 4){
		return true;
	}
	// check right down
	if (getManhattanDistance(1, 11, shape_indexes[0], shape_indexes[1]) <= 4){
		return true;
	}
	return false;
}

function getManhattanDistance(row1, col1, row2, col2){
	return Math.abs(row1 - row2) + Math.abs(col1 - col2);
}

function getIndexes(pixel_row, pixel_col){
	var index_row = Math.floor(pixel_row/40);
	var index_col = Math.floor(pixel_col/40);
	return [index_row, index_col];
}

function random(bound) {
	return Math.floor(Math.random() * bound + 1);
}

function getEmptyCell() {
	let row = random(rows-1);
	let col = random(cols-1);
	while (!isEmpty(row, col)) {
		row = random(rows-1);
		col = random(cols-1);
	}
	return [row, col];
}

function setRandomPacmanPosition() {
	let cell = getEmptyCell();
	while (isBesideMonster(cell[0], cell[1])){
		cell = getEmptyCell();
	}
	let row = cell[0];
	let col = cell[1];
	shape.i = col * 40 + 20;
	shape.j = row * 40 + 20;
	shape.direction = "right";
	shape.mouth = "close";
	shape.move = false;
}

function putFoodRandomaly() {

	var shape_index_i = Math.floor(shape.i/40);
	var shape_index_j = Math.floor(shape.j/40);

	//FOOD:
	var p5Ball = 0.6*food_remain;
	var p15Ball = 0.3*food_remain;
	var p25Ball = food_remain - (p5Ball + p15Ball);

	while( p5Ball > 0){
		var emptyCell = getEmptyCell();
		while(emptyCell[1] == shape_index_i && emptyCell[0] == shape_index_j){
			emptyCell = getEmptyCell();
		}
		board[emptyCell[1]][emptyCell[0]] = 5;
		p5Ball--;
	}
	while( p15Ball > 0){
		var emptyCell = getEmptyCell();
		while(emptyCell[1] == shape_index_i && emptyCell[0] == shape_index_j){
			emptyCell = getEmptyCell();
		}
		board[emptyCell[1]][emptyCell[0]] = 15;
		p15Ball--;
	}
	while( p25Ball > 0){
		var emptyCell = getEmptyCell();
		while(emptyCell[1] == shape_index_i && emptyCell[0] == shape_index_j){
			emptyCell = getEmptyCell();
		}
		board[emptyCell[1]][emptyCell[0]] = 25;
		p25Ball--;
	}
	
}

function setGhosts(){
	monsters = new Array();
	for (let k=0; k<num_of_monsters; k++){
		monsters[k] = new Object();
		if (k==0){
			monsters[k].i = 60;
			monsters[k].j = 60;
		}
		else if(k==1){
			monsters[k].i = 660;
			monsters[k].j = 60;
		}
		else if(k==2){
			monsters[k].i = 660;
			monsters[k].j = 460;
		}
		else if(k==3){
			monsters[k].i = 60;
			monsters[k].j = 460;
		}
		monsters[k].speed = 0.32;
	}
}

function setCherry(){
	cherry = new Object();
	cherryImg = new Image();
	cherryImg.src = "./images/cherry/1.png";

	var indexi;
	var indexj;
	var shape_indexes = getIndexes(shape.j, shape.i);
	if (num_of_monsters == 4){
		var emptyCell = getEmptyCell();
		while(emptyCell[0] == shape_indexes[0] && emptyCell[1] == shape_indexes[1]){
			emptyCell = getEmptyCell();
		}
		indexi = emptyCell[1];
		indexj = emptyCell[0];
	}
	else{
		indexi = 1;
		indexj = 11;
	}
	cherry.i = indexi * 40 + 10;
	cherry.j = indexj * 40 + 10;
	cherry.speed = 0.1;
	cherry.eaten = false;
}

function setMedication(){
	medicationImg = new Image();
	medicationImg.src = "./images/medication/1.png";

	board[10][5] = 1;
	board[1][9] = 1;
}

function setClock(){
	clockImg = new Image();
	clockImg.src = "./images/clock/1.png";

	board[16][9] = 2;
	board[7][5] = 2;
}