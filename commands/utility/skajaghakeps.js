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
				interaction.reply(`Klart du ska ha keps! ${kepsReason} :billed_cap:`);
			}
			else {
				interaction.reply('Dessvärre är det inte en kepsdag idag :pensive:');
			}
		}
		catch (err) {
			console.error(err);
			interaction.reply('Jag bajsa på mig :poop:. Be <@&1305532305552703560> städa upp det här :sick:');
		}
	},
};