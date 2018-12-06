var sizeCar = 10;
var xOffsetCar = sizeCar/2, yOffsetCar = sizeCar;

// $('#draw-car1').css({ 'top': 5, 'left': 5,
// 	'border-left': '' + sizeCar + 'px solid transparent',
// 	'border-right': '' + sizeCar + 'px solid transparent',
// 	'border-bottom': '' + sizeCar + 'px solid blue',
// });





let maxSpeed = 7;
let arrSpeed = [];
let lenArrSpeed = 50;
let ratioSpeedUp = 0.6;
let initSpeed = function() {
	arrSpeed[0] = maxSpeed * ratioSpeedUp;
	for(let i= 1; i <= lenArrSpeed; i++) {
		arrSpeed[i] = (maxSpeed - arrSpeed[i-1]) * ratioSpeedUp + arrSpeed[i-1];
	}
}

let handleLeft = function(car){
	setFace(car, car.rad - (20 * 0.017453));
}
let handleRight = function(car){
	setFace(car, car.rad + (20 * 0.017453));
}
let handleUp = function(car){
	car.speed = Math.min(lenArrSpeed, car.speed+1);
	car.isRunning = true
	let stepX = arrSpeed[car.speed] * Math.sin(car.rad) / 10;
	let stepY = arrSpeed[car.speed] * Math.cos(car.rad) / 10;
	let x2 = car.x;
	let y2 = car.y;
	let i;
	for(i= 0; i < 10 && checkCell(x2, y2); i++){
		x2 -= stepX;
		y2 -= stepY;
	}
	if(i < 10) {
		car.speed = 0;
		car.isRunning = false
	}
	x2 += stepX;
	y2 += stepY;
	return [x2, y2];
}
let handleDown = function(car){
	car.speed = -3;
	let x2 = car.x - car.speed * Math.sin(car.rad);
	let y2 = car.y - car.speed * Math.cos(car.rad);
	return [x2, y2];
}
let moveCar = function(car){
	let pos = [car.x, car.y]
	switch(car.move & 12){
		case 8:
			pos = handleUp(car);
			break;
		case 4:
			pos = handleDown(car);
			break;
	}
	if(checkCell(...pos))
		setPos(car, ...pos);
}
let cellLen = (fieldSize/wallSize-1);
let canRun = function(pos){
	cell = getCell(...pos)
	if(cell[0] < 0 || cell[0] > cellLen)
		return false
	if(cell[1] < 0 || cell[1] > cellLen)
		return false
	return !map[cell[0]][cell[1]]
}
var setPos = function(car, x=car.x, y=car.y){
	car.x = x;
	car.y = y;
	$('#draw-car'+car.id).css({'top': x, 'left': y});
	logg(car);
}
var setFace = function(car, rad=car.rad){
	car.rad = rad
	let v = car.rad - 1.5707963
	$('#draw-car'+car.id).css({
		'-ms-transform': 'rotate(' + v + 'rad)', /* IE 9 */
		'-webkit-transform': 'rotate(' + v + 'rad)', /* Safari */
		'transform': 'rotate(' + v + 'rad)',
	})
}









initSpeed();
console.log(arrSpeed);

