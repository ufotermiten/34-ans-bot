const { SlashCommandBuilder } = require('discord.js');
const getKepsDays = require('../../util/getKepsDays');

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
				const kepsTime = !kepsDay.recurring ? new Date(kepsDay.date).getTime() : NaN;
				// if the kepsDay is the same day or in the future OR recurring
				if (kepsTime - now >= -msPerDay || kepsDay.recurring) return true;
				return false;
			}).sort((kd1, kd2) => {
				const currentYear = new Date().getFullYear();
				const t1 = new Date(!kd1.recurring ? kd1.date : `${currentYear}-${kd1.date.slice(5)}`).getTime();
				const t2 = new Date(!kd2.recurring ? kd2.date : `${currentYear}-${kd2.date.slice(5)}`).getTime();
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