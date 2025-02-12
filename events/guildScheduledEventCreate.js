const { Events } = require('discord.js');
const fs = require('node:fs');
const Papa = require('papaparse');

const kepsDaysFile = './data/kepsdagar.csv';

module.exports = {
	name: Events.GuildScheduledEventCreate,
	execute(event) {
		const eventInfo = (event.name + event.description).toLowerCase();
		if (eventInfo.includes('sittning')) {
			const date = new Date().toISOString().slice(0, 10);
			updateKepsdagar({ date, recurring: false, reason: `Det är ${event.name}` });
		}
	},
};

// update the file contain kepsdagar with the new kepsdag
function updateKepsdagar(kepsInfo) {
	const kepsDays = Papa.parse(fs.readFileSync(kepsDaysFile, 'utf8'), { header: true }).data;
	kepsDays.push(kepsInfo);
	fs.writeFileSync(kepsDaysFile, Papa.unparse(kepsDays), { header: true });
}