var debug = true
var logParam = function(...content){
	if(!debug)
		return
	console.log(...content)
}
var print = logParam

var logg = function(car){
	// $('#log').html('X: ' + car.x + ' Y: ' + car.y + ' Rad: ' + Math.round((car.rad * 180 / 3.1415926535 + 180) % 360) + '<br />Move' + move);
	$('#status'+car.id).html(`
							<table>
						<tr>
							<td>| X: ${Math.round(car.x)}</td>
							<td>| Y: ${Math.round(car.y)}</td>
							<td>| Rad: ${Math.round((car.rad * 180 / 3.1415926535 + 180) % 360)}</td>
						</tr>
						<tr>
							<td>| Point: ${getProbability(car.x, car.y)} / ${car.maxPoint}</td>
							<td colspan="2">| Finish: ${car.finishTime} / ${car.resetTime}</td>
						</tr>
						<tr>
							<td colspan="4">${!car.connect?"Hand mode":""}${car.train?"Training":""}${car.run?"Running":""}</td>
						</tr>
					</table>
`)
}
