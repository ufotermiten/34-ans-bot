const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

const kepsDaysFile = './data/kepsdagar.json';

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
		const day = interaction.options.getNumber('dag');
		const month = interaction.options.getNumber('månad');
		const year = interaction.options.getNumber('år');
		const dateString = `${year}-${pad(month)}-${pad(day)}`;
		const kepsDate = new Date(dateString);

		const recurring = interaction.options.getBoolean('återkommande');
		const reason = interaction.options.getString('anledning');

		const kepsInfo = { date: kepsDate, recurring: recurring, reason: reason };
		try {
			await updateKepsdagar(kepsInfo);
			interaction.reply(`Ny kepsdag den **${dateString}** registrerad! :whale:\n\n**Anledning:** ${reason}`);
		}
		catch (err) {
			console.error(err);
			interaction.reply('Något gick fel, kontakta <@&1305532305552703560>.');
		}
	},
};

// update the file contain kepsdagar with the new kepsdag
function updateKepsdagar(kepsData) {
	const kepsDays = JSON.parse(fs.readFileSync(kepsDaysFile));
	kepsDays['days'].push(kepsData);
	fs.writeFileSync(kepsDaysFile, JSON.stringify(kepsDays));
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