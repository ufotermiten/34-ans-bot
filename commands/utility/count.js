const { SlashCommandBuilder } = require('discord.js');
const sleep = require('../../util/sleep');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('Skriv hur högt du vill att boten ska räkna')
		.addNumberOption(option =>
			option
				.setName('siffra')
				.setDescription('Hur högt du vill räkna')
				.setRequired(true)),
	async execute(interaction) {
		const countTo = interaction.options.getNumber('siffra');
		interaction.reply({ content: `Okej, om du envisas kan jag väl räkna till ${countTo} åt dig...` });
		for (let i = 1; i <= countTo; i++) {
			if (i === 34) {
				await interaction.channel.send('<:34_an:1305515512578441256>');
			}
			else {
				await interaction.channel.send(`${i}`);
			}
			await sleep(100);
		}
	},
};
