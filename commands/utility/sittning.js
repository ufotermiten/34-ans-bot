const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sittning')
		.setDescription('Sittningläge')
		// Admin level command
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const knolvalsReminder = interaction.client.knolvalsReminder;
		// Toggle reminder on or off.
		if (!knolvalsReminder.running) {
			knolvalsReminder.start();
			interaction.reply('Sittningsläget **AKTIVERAT**');
		}
		else {
			knolvalsReminder.stop();
			interaction.reply('Sittningsläget **AVAKTIVERAT**');
		}

	},
};