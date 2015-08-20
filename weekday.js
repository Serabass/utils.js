var date = new Date(2015, 05, 3);

var weekDay = function (day) {
	return function (date) {
		var date = new Date(date);
		date.setDate(date.getDate() - (date.getDay()) + day);
		return date;
	}
};

var mon = weekDay(1)(date);
var sun = weekDay(7)(date);

console.log(date);
console.log(mon);
console.log(sun);
