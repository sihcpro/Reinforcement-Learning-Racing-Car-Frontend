var newCar = function(id = 0, name = "car1", move = 0) {
	return {
		id: id,
		name: name,
		link: 'http://0.0.0.0:5000/',
		message: '',

		x : 25,
		y : 15,
		rad : 180 / 57.296,
		speed : 0,

		save : false,
		move : move,
		isRunning : true,
		connect : false,
		saving : false,
		train : false,
		reset : false,
		run : false,
		serverMove : 0,

		countFunc : 0,
		fUpdate : 1,
		fFrame : 20,

		finishTime : 0,
		resetTime : 0,
		maxPoint : 3,
	}
}
var resetCar = function(car) {
	car.resetTime++

	car.x = 25
	car.y = 15
	car.rad = 180 / 57.296
	car.speed = 0
	car.isRunning = true
	setPos(car)
	setFace(car)
}

var finishPoint = 60
var CAR = {size: 0}
var car1 = newCar(CAR.size)
CAR[CAR.size] = car1
CAR.size++

var rd = function(num) {
	return Math.round(num * 100) / 100
}

var MoveCar = function(car) {
	car.countFunc = (car.countFunc + 1)%car.fUpdate
	if( car.countFunc == 0 ){
		let tmp = getSensor(car)
		car.move = move
		if( speed == 0 ) {
			car.speed = speed
		}
		speed = car.speed + 1
		car.isRunning = true
	}
	if((car.move & 12) > 0)
		moveCar(car);
	switch(car.move & 3){
		case 2:
			handleLeft(car);
			break;
		case 1:
			handleRight(car);
			break;
	}
}

var TrainCarByServer = function(car, serverMove = -2) {
	if(serverMove == -2){
		if(car.isRunning) {
			car.maxPoint = getProbability(car.x, car.y)
			car.finishTime++
		}
		resetCar(car)
	} else {
		setFace(car, car.rad + serverMove*(20 * 0.017453));
		moveCar(car);
	}

	let tmp = getSensor(car)
	tmp = [0+car.save, car.name, car.move, rd(car.rad), rd(car.x), rd(car.y), rd(car.speed), getProbability(car.x, car.y), 0+car.isRunning, ""] + tmp +["", frequencySensor]
	if(car.save)
		saveFunc(car.id)
	if(car.train) {
		if( car.reset ) {
			resetCar(car)
		}
		setTimeout(function(){sendTrainData(car, ""+tmp)}, 1)
	}
}

var RunCarByServer = function(car, serverMove = -2) {
	setFace(car, car.rad + serverMove*(20 * 0.017453));
	moveCar(car);

	p = getProbability(car.x, car.y)
	if(p == finishPoint){
		car.finishTime++
		car.maxPoint = finishPoint
		resetCar(car)
	} else if(car.speed == 0 ) {
		resetCar(car)
	} else if(car.maxPoint < p) {
		car.maxPoint = p
	}

	let tmp = getSensor(car)
	for (let i in tmp) {
		tmp[i] = 1.0 * tmp[i] / frequencySensor
	}
	tmp = [car.name, ""] + tmp
	if(car.run) {
		if( car.reset ){
			resetCar(car)
		}
		setTimeout(function(){sendRunData(car, ""+tmp)}, 1)
	}
}


drawAllWall()
// let i= 0
var handMode = []
for(let i = 0; i < CAR.size; i++){
	setPos(CAR[i])
	setFace(CAR[i])
	drawSensor(CAR[i].id)
	handMode[i] = setInterval(MoveCar, 1000/CAR[i].fFrame, CAR[i]);
}

