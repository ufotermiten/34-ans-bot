const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const Papa = require('papaparse');

const kepsDaysFile = './data/kepsdagar.csv';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nykepsdag')
		.setDescription('Ange en dag som 34:an borde bära keps på!')
		.addNumberOption(option =>
			option
				.setName('dag')
				.setDescription('Vilken dag inträffar kepsdagen?')
				.setRequired(true),
		)
		.addNumberOption(option =>
			option
				.setName('månad')
				.setDescription('Vilken månad inträffar kepsdagen?')
				.setRequired(true))
		.addNumberOption(option =>
			option
				.setName('år')
				.setDescription('Vilket år inträffar kepsdagen?')
				.setRequired(true))
		.addBooleanOption(option =>
			option
				.setName('återkommande')
				.setDescription('Inträffar kepsdagen på samma datum kommande år?')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('anledning')
				.setDescription('Vad är anledningen till kepsdagen?')
				.setRequired(true),
		),
	async execute(interaction) {
		const kepsInfo = optionsToKepsInfo(interaction.options);
		try {
			updateKepsdagar(kepsInfo);
			interaction.reply(`Ny kepsdag den **${kepsInfo.date}** registrerad!`
				+ ` :whale:\n\n**Anledning:** ${kepsInfo.reason}`);
		}
		catch (err) {
			console.error(err);
			interaction.reply(`Något gick fel, kontakta <@&${process.env.BOT_DEV_ROLE_ID}>.`);
		}
	},
};

// update the file contain kepsdagar with the new kepsdag
function updateKepsdagar(kepsInfo) {
	const kepsDays = Papa.parse(fs.readFileSync(kepsDaysFile, 'utf8'), { header: true }).data;
	kepsDays.push(kepsInfo);
	fs.writeFileSync(kepsDaysFile, Papa.unparse(kepsDays), { header: true });
}

// builds a kepsInfo object from the options
function optionsToKepsInfo(options) {
	const day = options.getNumber('dag');
	const month = options.getNumber('månad');
	const year = options.getNumber('år');
	const dateString = `${year}-${pad(month)}-${pad(day)}`;

	const recurring = options.getBoolean('återkommande');
	const reason = options.getString('anledning');

	return { date: dateString, recurring, reason };
}

// if the given number/string contains less than two digits,
// pad with an extra zero on the left and return as string
function pad(number) {
	const nString = number.toString();
	if (nString.length < 2) {
		return '0' + nString;
	}
	return nString;
}