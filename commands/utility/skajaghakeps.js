const { SlashCommandBuilder } = require('discord.js');
const kepsdag = require('../../util/kepsdag.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skajaghakeps')
		.setDescription('För dig som undrar om du ska ha keps på dig'),
	async execute(interaction) {
		try {
			const kepsReason = kepsdag();
			if (kepsReason) {
				interaction.reply(`${kepsReason}, klart du ska ha keps! :billed_cap:`);
			}
			else {
				interaction.reply('Dessvärre är det inte en kepsdag idag :pensive:');
			}
		}
		catch (err) {
			console.error(err);
			interaction.reply(`Jag bajsa på mig :poop:. Be <@&${process.env.BOT_DEV_ROLE_ID}>`
				+ ' städa upp det här :sick:');
		}
	},
};