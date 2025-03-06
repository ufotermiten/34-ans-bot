const getKepsDays = require('./getKepsDays');

module.exports = (type) => {
	// the variable names are confusing
	// if the type of keps-check is reminder, we need
	// to look if the next day is a kepsdag, otherwise
	// check against todays date
	const today = new Date();
	today.setDate(type == 'reminder' ? today.getDate() + 1 : today.getDate());
	const compareDate = today.toISOString().slice(0, 10);
	const kepsDays = getKepsDays();
	for (const kepsDay of kepsDays) {
		// if recurring kepsdag, check if days and months match
		if (kepsDay.recurring) {
			if (dayMonthEq(compareDate, kepsDay.date)) return kepsDay.reason;
		}
		// else include year
		else if (eq(compareDate, kepsDay.date)) {return kepsDay.reason;}
	}
	return null;
};

// given date like YYYY-MM-DD, check if month and day portions match
function dayMonthEq(date1, date2) {
	return date1.slice(5, 10) == date2.slice(5, 10);
}

// same but including year
function eq(date1, date2) {
	return date1 == date2;
}