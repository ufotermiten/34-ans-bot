const fs = require('node:fs');
const kepsDaysFile = './data/kepsdagar.json';

module.exports = () => {
	const today = new Date();
	const kepsData = JSON.parse(fs.readFileSync(kepsDaysFile));
	for (const kepsDay of kepsData.days) {
		const kepsDate = new Date(kepsDay.date);
		// if recurring kepsdag, check if days and months match
		if (kepsDay.recurring) {
			if (dayMonthEq(today, kepsDate)) return kepsDay.reason;
		}
		// else include year
		else if (eq(today, kepsDate)) {return kepsDay.reason;}
	}
	return null;
};

// converts dates to ISO-strings (YYYY-MM-DDandotherstuff) and checks if months and day
// portions match
function dayMonthEq(date1, date2) {
	const ds1 = date1.toISOString();
	const ds2 = date2.toISOString();
	return ds1.slice(5, 10) == ds2.slice(5, 10);
}

// same but including year
function eq(date1, date2) {
	const ds1 = date1.toISOString();
	const ds2 = date2.toISOString();
	return ds1.slice(0, 10) == ds2.slice(0, 10);
}