const cron = require('cron');

const { SlashCommandBuilder } = require('discord.js');
const scheduledMessage = new cron.CronJob('00 33 * * * *', () => {
	interaction.channel.send('@everyone Om 1 minut är klockan 34!');
});

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
		
		console.log(scheduledMessage.running);
		if (!scheduledMessage.running) {
			// When you want to start it, use:
			interaction.reply('Sittningsläget **AKTIVERAT**');
			scheduledMessage.start();
		}
		else {
			scheduledMessage.stop();
			interaction.reply('Sittningsläget **AVAKTIVERAT**');
		}

	},
};