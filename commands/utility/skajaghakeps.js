const { SlashCommandBuilder } = require('discord.js');
const getKepsReason = require('../../util/getKepsReason.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skajaghakeps')
		.setDescription('För dig som undrar om du ska ha keps på dig'),
	async execute(interaction) {
		await interaction.deferReply();
		try {
			const kepsReason = getKepsReason('query');
			if (kepsReason) {
				interaction.editReply(`${kepsReason}, klart du ska ha keps! :billed_cap:`);
			}
			else {
				interaction.editReply('Dessvärre är det inte en kepsdag idag :pensive:');
			}
		}
		catch (err) {
			console.error(err);
			interaction.editReply(`Jag bajsa på mig :poop:. Be <@&${process.env.BOT_DEV_ROLE_ID}>`
				+ ' städa upp det här :sick:');
		}
	},
};