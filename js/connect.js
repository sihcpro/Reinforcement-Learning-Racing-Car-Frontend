var sendRequestConnect = function(id) {
	car = CAR[id]
	car.link = $('#link'+id)[0].value
	car.name = $('#car_name'+id)[0].value
	car.maxPoint = 3
	let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		logParam('request.onreadystatechange')
		logParam(this)
		if (this.readyState == 4) {
			logParam(this.responseText)
			if (this.responseText.length > 0) {
				let returnObject = JSON.parse(this.responseText)
				switch(returnObject['status']){
					case 200:
						connectFunc(id)
						break
					default:
				}
			}
		}
	}
	request.open('GET', car.link + 'init/' + car.name);
	if(!car.connect){
		request.send();
	} else {
		resetCar(car)
		car.move = 0
		car.finishTime = 0
		car.resetTime = 0
		connectFunc(id)
	}
}


////////////////////////////     connect     //////////////////////////////
////////////////////////////     train       //////////////////////////////


var sendGetTrain = function(id) {
	car = CAR[id]
	let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			logParam(this.responseText)
			let returnObject = JSON.parse(this.responseText)
			switch(this.status){
			case 200:
				showTrain(id)
				TrainCarByServer(car, -2)
				break
			default:
				logParam('error', returnObject)
			}
		}
	}
	request.open('GET', car.link + 'get-train/'+car.name);
	request.send();
}

var sendTrainData = function(car, content){
	logParam(content)
	let request = new XMLHttpRequest()
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			// logParam(this.responseText);
			let returnObject = JSON.parse(this.responseText)

			logParam(returnObject)
			switch(this.status){
			case 200:
				car.serverMove = returnObject['move']
				car.message = returnObject['message']
				break
			default:
				logParam('error', returnObject)
				car.serverMove = 0
			}
			TrainCarByServer(car, car.serverMove)
		}
	};
	request.open('GET', car.link + 'train/'+content);
	request.send();
}


////////////////////////////     train     //////////////////////////////
////////////////////////////     load      //////////////////////////////


var sendGetLoad = function(id) {
	car = CAR[id]
	let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			// logParam(this.responseText)
			let returnObject = JSON.parse(this.responseText)
			switch(this.status){
			case 200:
				tmp_load = returnObject['file']
				load = []
				for (let f in tmp_load) {
					for (let name in tmp_load[f]) {
						load.push(name)
					}
				}
				load.sort()
				car.load = load
				showLoad(id)
				break
			default:
				logParam('error', returnObject)
			}
		}
	}
	request.open('GET', car.link + 'get-load/'+car.name);
	request.send();
}

var sendLoadCar = function(id, id_file) {
	car = CAR[id]
	href = car.link + 'load/' + [car.name, car.load[id_file]]
	let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			let returnObject = JSON.parse(this.responseText)
			switch(this.status){
			case 200:
				loadFunc(id)
				RunCarByServer(car, -2)
				break
			default:
				logParam('sendLoadCar', 'error', returnObject, this)
			}
		}
	}
	request.open('GET', href);
	request.send();
}

var sendRunData = function(car, content) {
	let request = new XMLHttpRequest()
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			// logParam(this.responseText);
			let returnObject = JSON.parse(this.responseText)

			logParam(returnObject)
			switch(this.status){
			case 200:
				serverMove = returnObject['move']
				car.move = 8
				break
			default:
				logParam('error', returnObject)
				serverMove = -2
			}
			RunCarByServer(car, serverMove)
		}
	};
	request.open('GET', car.link + 'run/'+content);
	request.send();
}


////////////////////////////     request     //////////////////////////////
////////////////////////////     graphict    //////////////////////////////


// var connect = false
// var save = false
// var train = false
// var run = false

var connectFunc = function(id = 0) {
	car = CAR[id]
	if( car.connect ) {
		if( car.save )
			saveFunc(id)
		$('#connect'+id).html("Connect")
		$('.connected'+id).css({"display": "none"})

		logParam('connectFunc', 'car', car)
		car.train = false
		car.run = false
		car.move = 0
		handMode[id] = setInterval(MoveCar, 1000/car.fFrame, car)
	} else {
		$('#connect'+id).html("Disconnect")
		$('#main-control'+id).css({"display": "table-row"})

		clearInterval(handMode[id])
	}
	car.connect = !car.connect
}
var saveFunc = function(id) {
	car = CAR[id]
	logParam('id', id, 'car', car)
	if(car.train) {
		$('#save'+id).css({"display": "table-row"})
		if( car.save ) {
			$('#save'+id).html('Save')
		} else {
			$('#save'+id).html('Done')
		}
		car.save = !car.save
	} else {
		connectFunc(id)
	}
}
var showTrain = function(id) {
	car = CAR[id]
	car.train = true
	car.run = false
	car.move = 8
	$('#train-control'+id).css({"display": "table-row"})
	$('#main-control'+id).css({"display": "none"})
}
var getLoadFunc = function(id) {
	car = CAR[id]
	car.run = true
	car.train = false
	car.move = 8
	$("#load-control"+id).css({"display": "table-row"})
	sendGetLoad(id)
}
var showLoad = function(id) {
	car = CAR[id]
	logParam('showLoad:', id, car)
	file = '<div id="load' + id + '">\n'
	for (let f in car.load) {
		// logParam(href, car.load[f])
		file += '<td><button onclick="sendLoadCar(' + [id, f] + ')">' + car.load[f] + '</button></td>\n'
	}
	file += '</div>\n'
	logParam(file)
	$('#load-link'+id).html(file)
	$('#main-control'+id).css({"display": "none"})
}
var loadFunc = function(id) {
	$('#load_link'+id).html('')
	$('#main-control'+id).css({"display": "none"})
	$('#load-control'+id).css({"display": "none"})
	$('#run-control'+id).css({"display": "table-row"})
}
var pauseFunc = function(id) {
	car = CAR[id]
	car.train = !car.train
	if(car.train){
		$('#pause'+id).html('Pause')
		TrainCarByServer(car, car.serverMove)
	} else {
		$('#pause'+id).html('Continue')
	}
}





var addServer = function() {
	id = CAR.size
	CAR[CAR.size] = newCar(CAR.size)
	CAR.size++
	handMode[id] = setInterval(MoveCar, 1000/CAR[id].fFrame, CAR[id]);
	html = `
			<div id="server${id}" class="server">
				<div id="color${id}" class="color"></div>
				<div id="status${id}" class="status"></div>
				<table class="button">
					<tr>
						<td>link</td>
						<td>
							<input type="text" name="link" id="link${id}" value="http://0.0.0.0:5000/" style="width: 194px">
						</td>
					</tr>
					<tr>
						<td>name</td>
						<td>
							<input type="text" name="car_name" id="car_name${id}" value="car1" style="width: 100px">
							<button id="connect${id}" onclick="sendRequestConnect(${id})" style="width: 90px">Connect</button>
						</td>
					</tr>
					<tr class="connected${id}" id="main-control${id}" style="display: none">
						<td></td>
						<td>
							<button id="train${id}" onclick="sendGetTrain(${id})">Train</button>
							<button id="load${id}" onclick="getLoadFunc(${id})">Load</button>
						</td>
					</tr>
					<tr class="connected${id}" id="train-control${id}" style="display: none">
						<td></td>
						<td>
							<button id="pause${id}" onclick="pauseFunc(${id})">Pause</button>
							<button id="save${id}" onclick="saveFunc(${id})">Save</button>
						</td>
					</tr>
					<!-- <button id="relearn">Relearn</button> -->
				</table>
				<div class="connected${id}" id="load-control${id}" style="display: none">
					<div id="load-link${id}" class="load-link"></div>
				</div>
			</div>
		`
	$('#server').append(html)
	$('#car').append(`
			<span id="car${id}">
				<div id="draw-car${id}" class="car">
			</div>`)
	// logParam(html)


	setPos(CAR[id])
	setFace(CAR[id])
	drawSensor(CAR[id].id)


	if(CAR.size > 6){
		$('#addServer').remove()
	}
}


