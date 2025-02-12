const fs = require('node:fs');
const Papa = require('papaparse');

const kepsDaysFile = './data/kepsdagar.csv';

module.exports = () => {
	const today = new Date().toISOString().slice(0, 10);
	// const kepsData = JSON.parse(fs.readFileSync(kepsDaysFile));
	const kepsDays = Papa.parse(fs.readFileSync(kepsDaysFile, 'utf8'), { header: true }).data;
	for (const kepsDay of kepsDays) {
		// if recurring kepsdag, check if days and months match
		if (kepsDay.recurring == 'true') {
			if (dayMonthEq(today, kepsDay.date)) return kepsDay.reason;
		}
		// else include year
		else if (eq(today, kepsDay.date)) {return kepsDay.reason;}
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