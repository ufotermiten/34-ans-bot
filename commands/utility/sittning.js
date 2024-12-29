const { SlashCommandBuilder } = require('discord.js');

const { knolvalsReminder } = require('../../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sittning')
		.setDescription('Sittningläge'),
	async execute(interaction) {
		const hasAdminRole = interaction.member.roles.cache.some(role => role.name.toLowerCase() === 'admin');

		if (!hasAdminRole) {
			// If the user does not have the admin role
			interaction.reply('Din råtta du är inte admin');
			return;
		}

		if (!knolvalsReminder.running) {
			// When you want to start it, use:
			interaction.reply('Sittningsläget **AKTIVERAT**');
			knolvalsReminder.start();
		}
		else {
			knolvalsReminder.stop();
			interaction.reply('Sittningsläget **AVAKTIVERAT**');
		}

	},
};