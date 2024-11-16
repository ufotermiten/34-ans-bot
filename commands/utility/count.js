const { SlashCommandBuilder } = require('discord.js');
const sleep = require('../../util/sleep');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('Skriv hur högt du vill att boten ska räkna'),
	async execute(interaction, arg) {
		for (let i = 1; i < arg; i++) {
			if (i === 34) {
				await interaction.channel.send('<:34_an:1305515512578441256>');
			}
			else {
				await interaction.channel.send(i);
			}
			await sleep(100);
		}
	},
};
