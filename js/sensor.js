var maxLengSensor = 200
var sensitivity = 10
var frequencySensor = maxLengSensor * sensitivity
var angleDeviation = 0.523598776 * 1
var numOfSensor = 2

let setSensorPosition = function(car, id, x, y) {
	// console.log("sensor  : ", id, x, y, "#sensor"+id)
	$("#car" + car.id + "sensor" + id).css({
		'top': x - 2,
		'left': y - 2,
	})
}

let getLengSensor = function(car, id, rad) {
	let x = car.x + xOffsetCar
	let y = car.y + yOffsetCar
	let stepX = Math.sin(car.rad + rad) / sensitivity
	let stepY = Math.cos(car.rad + rad) / sensitivity
	let i = 0
	for(; i < frequencySensor; i++){
		x -= stepX
		y -= stepY
		if( !checkCellSensor(x, y) ){
			setSensorPosition(car, id, x + stepX, y + stepY)
			return i
		}
	}
	setSensorPosition(car, id, x, y)
	return i
}

let getSensor = function(car) {
	let rad = numOfSensor * angleDeviation
	let result = []
	let angle = []
	for(let i = 0; i < numOfSensor * 2 + 1; i++){
		angle[i] = rad
		result[i] = getLengSensor(car, i, rad)
		rad -= angleDeviation
	}
	return result
}

let drawSensor = function(car_id = 0) {
	for(let i = 0; i < numOfSensor * 2 + 1; i++){
		let id = 'car' + car_id + 'sensor' + i;
		let div = "<div id=\""+id+"\" class=\"sensor\">";
		logParam(div)
		$("#car"+car_id).append(div);
	}
}
