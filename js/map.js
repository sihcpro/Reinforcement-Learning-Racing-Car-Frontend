var map = [];
var arrWall = [];
var wallSize = 30;
var fieldSize = 600;
var fieldSizeX = 600;
var fieldSizeY = 600;
// var mapSize = Math.floor(fieldSize/wallSize);
var mapSizeX = Math.floor(fieldSizeX/wallSize);
var mapSizeY = Math.floor(fieldSizeY/wallSize);

function readyMap() {
	let lineTop = []
	let lineBot = []
	lineTop[mapSizeY+1] = false
	lineBot[mapSizeY+1] = false
	lineTop.fill(false)
	lineBot.fill(false)
	map[0] = lineTop
	map[mapSizeX+1] = lineBot
	for( let i = 1; i <= mapSizeX; i++){
		let line = []
		line[mapSizeY+1] = true
		line.fill(true)
		line[0] = false
		line[mapSizeY+1] = false
		map[i] = line
		html = `<tr>`
		for( let j = 1; j <= mapSizeY; j++){
			html += `<td id="cell${i * mapSizeX + j}" class="cell"><input id="input${i * mapSizeX + j}" type="text" style="display: none" class="cell"></td>`
		}
		html += `</tr>`
		$('#map').append(html)
	}
}
function setBlock(...arrBlock) {
	console.log(arrBlock)
	for(let i of arrBlock){
		if( i[0] > 0 && i[1] > 0 ){
			i[0] = (i[0] - 1) % mapSizeX + 1
			i[1] = (i[1] - 1) % mapSizeY + 1
			if( map[i[0]][i[1]] )
				arrWall[arrWall.length] = i;
			map[i[0]][i[1]] = false;
		}
		else{
			console.log("Wrong type: ", i)
		}
	}
}

function drawAWall(x, y, bool) {
	if(bool) {
		$("#cell" + (x * mapSizeX + y)).css({"background-color" : "black"})
	} else {
		$("#cell" + (x * mapSizeX + y)).css({"background-color" : "white"})
	}
}
function drawAllWall() {
	console.log("draw All Wall");
	for( let i = 1; i <= mapSizeX; i++){
		for( let j = 1; j <= mapSizeY; j++){
			if(getProb(i-1,j-1) == 0){
				drawAWall(i, j, true)
			} else {
				drawAWall(i, j, false)
			}
		}
	}
}
function getCell(x, y) {
	return [Math.floor((x + xOffsetCar) / wallSize),
		Math.floor((y + yOffsetCar) / wallSize)];
}
function checkC(x, y) {
	if( x < 0 || x > mapSizeX+1 || y < 0 || y > mapSizeY+1 )
		return false
	return map[Math.floor(x+1)][Math.floor(y+1)]
}
function checkCell(x, y) {
	let x2 = Math.floor((x + xOffsetCar) / wallSize)
	let y2 = Math.floor((y + yOffsetCar) / wallSize)
	return checkC(x2, y2)
}
function checkCellSensor(x, y) {
	let x2 = x / wallSize
	let y2 = y / wallSize
	return checkC(x2, y2)
}


var mapEditable = false
var editMap = function function_name() {
	logParam('editMap')
	for( let i = 1; i <= mapSizeX; i++){
		for( let j = 1; j <= mapSizeY; j++){
			if(mapEditable) {
				let value = parseInt($("#input" + (i * mapSizeX + j)).val())
				if(getProb(i-1, j-1) == 0 && 0 != value){
					map[i][j] = true;
				} else if(getProb(i-1, j-1) != 0 && value == 0) {
					map[i][j] = false;
				}
				setProb(i-1, j-1, value)
				$("#input" + (i * mapSizeX + j)).css({"display": "none"})
			} else {
				// logParam(i, j, getProbability(i, j))
				point = getProb(i-1, j-1)
				define = (255 - Math.min(Math.trunc(255*point/finishPoint), 255)).toString(16)
				while( define.length < 2 ){
					define = '0' + define
				}
				color = "#"+define+"0fff"
				if( point == 0 )
					color = "#ffffff"
				// logParam(i, j, color)
				$("#input" + (i * mapSizeX + j)).val(getProb(i-1, j-1))
				$("#input" + (i * mapSizeX + j)).css({"display": "block", "background-color": color})
			}
		}
	}
	drawAllWall()
	mapEditable = !mapEditable
}









readyMap()
setBlock(
	[4	,3	], [5	,3	], [6	,3	], [7	,3	], [8	,3	], [9	,3	], [10	,3	], [11	,3	],
	[12	,3	], [13	,3	], [14	,3	], [15	,3	], [16	,3	], [17	,3	], [17	,3	],

	[3	,3	], [3	,4	], [3	,5	], [3	,6	], [3	,7	], [3	,8	], [3	,9	], [3	,10	],
	[3	,11	], [3	,12	], [3	,13	], [3	,14	], [3	,15	], [3	,16	], [3	,17	],

	[17	,5	], [17	,4	], [17	,6	], [17	,7	], [17	,8	], [17	,9	], [17	,10	],
	[17	,11	], [17	,12	], [17	,13	], [17	,14	], [17	,15	], [17	,16	], [17	,17	],

	[10	,4	], [10	,5	], [10	,6	], [10	,7	], [10	,8	], [10	,9	], [10	,10	],
	[10	,11	], [10	,12	], [10	,13	], [10	,14	], [10	,15	], [10	,16	], [10	,17	],

	[14	,7	], [14	,8	], [14	,9	], [14	,10	], [14	,11	], [14	,12	], [14	,13	],
	[14	,14	], [14	,15	], [14	,16	], [14	,17	], [14	,18	], [14	,19	], [14	,20	],

	[6	,7	], [6	,8	], [6	,9	], [6	,10	], [6	,11	], [6	,12	], [6	,13	],
	[6	,14	], [6	,15	], [6	,16	], [6	,17	], [6	,18	], [6	,19	], [6	,20	],

	[3	,1	], [3	,2	],
)










