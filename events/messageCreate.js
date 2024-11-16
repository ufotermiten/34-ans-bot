const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.id == '522004874083172363') {
			await message.react('<:opp:1305899202819391508>');
		}
		else if (message.author.id == '226343548423766016') {
			await message.react('<:Lidl:1305900704199606333>');
		}
	},
};