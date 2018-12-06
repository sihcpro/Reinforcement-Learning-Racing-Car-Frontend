var move = 0
var speed = 0
$(document).ready(function(){
	console.log("Ready Start");
	$(document).keydown(function(e) {
		let today = new Date();
		time = today.getHours()
			+ ':' + today.getMinutes()
			+ ':' + today.getSeconds()
			+ ':' + today.getMilliseconds()
		switch(e.which){
			case 37:
				move &= 12;
				move |= 2;
				break;
			case 38:
				move &= 3;
				move |= 8;
				break;
			case 39:
				move &= 12;
				move |= 1;
				break;
			case 40:
				move &= 3;
				move |= 4;
				break;
		}
	});
	$(document).keyup(function(e) {
		switch(e.which){
			case 37:
			case 39:
				move &= 12;
				break;
			case 38:
			case 40:
				speed = 0;
				move &= 3;
				break;
		}
	});
});
