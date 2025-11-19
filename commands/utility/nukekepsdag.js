const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const Papa = require('papaparse');

const kepsDaysFile = './data/kepsdagar.csv';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nukekepsdag')
		.setDescription(
			'Ta bort en felaktigt inlagd kepsdag.',
		)
		.addNumberOption((option) =>
			option
				.setName('dag')
				.setDescription('Vilken dag inträffar kepsdagen?')
				.setRequired(true),
		)
		.addNumberOption((option) =>
			option
				.setName('månad')
				.setDescription('Vilken månad inträffar kepsdagen?')
				.setRequired(true),
		)
		.addNumberOption((option) =>
			option
				.setName('år')
				.setDescription('Vilket år inträffar kepsdagen?')
				.setRequired(true),
		)
		.addBooleanOption((option) =>
			option
				.setName('återkommande')
				.setDescription('Inträffar kepsdagen på samma datum kommande år?')
				.setRequired(true),
		)
		.addBooleanOption((option) =>
			option
				.setName('underskrift')
				.setDescription(
					'Intygar du på heder och samvete att kepsdagen du nu ska ta bort faktiskt är felaktig?',
				)
				.setRequired(true),
		),
	async execute(interaction) {
		await interaction.deferReply();

		if (!interaction.options.getBoolean('underskrift')) {
			const username = interaction.member.displayName;
			interaction.editReply(`${username} vågade inte skriva under på att hen faktiskt tar bort en felaktig kepsdag, skamligt.`);
			return;
		}

		const kepsInfo = optionsToKepsInfo(interaction.options);
		try {
			const removedKepsdagar = removeKepsdag(kepsInfo);
			if (removedKepsdagar.length === 0) {
				interaction.editReply('Datumet du angav finns inte bland de registrerade kepsdagarna. Jag rekommenderar att du undersöker `/kepsdagar` innan du stör mig igen. 🤡');
				return;
			}
			const reply = `Tog bort kepsdag${removedKepsdagar.length == 1 ? 'en' : 'arna'} den **${removedKepsdagar[0].date}**. 🫡`;
			interaction.editReply(
				reply,
			);
		}
		catch (err) {
			console.error(err);
			interaction.editReply(
				`Något gick fel, kontakta <@&${process.env.BOT_DEV_ROLE_ID}>.`,
			);
		}
	},
};

// keep all the kepsdagar that don't match the date that is to be removed
function removeKepsdag(toBeRemoved) {
	const kepsdagar = Papa.parse(fs.readFileSync(kepsDaysFile, 'utf8'), {
		header: true,
	}).data;
	const removedDays = [];
	const filteredKepsdagar = kepsdagar.filter((kepsdag) => {
		if (kepsdag.date === toBeRemoved.date) {
			removedDays.push(kepsdag);
			return false;
		}
		return true;
	},
	);
	fs.writeFileSync(kepsDaysFile, Papa.unparse(filteredKepsdagar), { header: true });
	return removedDays;
}

// builds a kepsInfo object from the options
function optionsToKepsInfo(options) {
	const recurring = options.getBoolean('återkommande');
	const reason = options.getString('anledning');

	const day = options.getNumber('dag');
	const month = options.getNumber('månad');
	const year = options.getNumber('år');
	const dateString = `${!recurring ? year : 'XXXX'}-${pad(month)}-${pad(day)}`;

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
