const cron = require('cron');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sittning')
		.setDescription('Sittningläge'),
	async execute(interaction) {
		interaction.reply('Started');
		const scheduledMessage = new cron.CronJob('00 33 * * * *', () => {
			interaction.channel.send('Om 1 minut är klockan 34!');
		});

		if (!scheduledMessage.running) {
			// When you want to start it, use:
			scheduledMessage.start();
		}
		else {
			scheduledMessage.stop();
		}

	},
};