const { SlashCommandBuilder } = require('discord.js');
const Papa = require('papaparse');
const fs = require('node:fs');

const kepsDaysFile = './data/kepsdagar.csv';
const msPerDay = 86400000;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kepsdagar')
		.setDescription('Visar framtida kepsdagar som redan är registrerade.'),
	async execute(interaction) {
		await interaction.deferReply();
		try {
			const kepsDays = getKepsDays();
			const now = new Date().getTime();
			const kepsDaysToPrint = kepsDays.filter((kepsDay) => {
				const kepsTime = new Date(kepsDay.date).getTime();
				// if the kepsDay is the same day or in the future OR recurring
				if (kepsTime - now >= -msPerDay || kepsDay.recurring == 'true') return true;
				return false;
			}).sort((kd1, kd2) => {
				const currentYear = new Date().getFullYear();
				const t1 = new Date(kd1.recurring == 'false' ? kd1.date : `${currentYear}-${kd1.date.slice(5)}`).getTime();
				const t2 = new Date(kd2.recurring == 'false' ? kd2.date : `${currentYear}-${kd2.date.slice(5)}`).getTime();
				return t1 - t2;
			});
			const message = kepsDaysToPrint.reduce((acc, kepsDay) => {
				const add = acc + `\n**${kepsDay.date}**: ${kepsDay.reason}`;
				return add;
			}, 'Framtida kepsdagar:\n');

			interaction.editReply(kepsDaysToPrint.length ? message : 'Det finns inga framtida kepsdagar registrerade :frowning2:');
		}
		catch (err) {
			console.error(err);
			interaction.editReply(`Jag bajsa på mig :poop:. Be <@&${process.env.BOT_DEV_ROLE_ID}>`
				+ ' städa upp det här :sick:');
		}
	},
};

function getKepsDays() {
	const kepsDays = Papa.parse(fs.readFileSync(kepsDaysFile, 'utf8'), { header: true }).data;
	return kepsDays;
}