const { SlashCommandBuilder } = require('discord.js');
const sleep = require('../../util/sleep');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sittning')
		.setDescription('Sätt boten i sittningsläget.')
		,
	async execute(interaction) {
        interaction.client.state.sittning = true;
		interaction.reply({ content: 'Sittningsmode **ACTIVATED**' });
		const d = new Date()
        while(interaction.client.state.sittning){
            minute = d.getMinutes();
            hour = d.getHours();
        }
	},
};
