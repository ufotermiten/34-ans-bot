const fs = require('fs');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dragosbild')
		.setDescription('Ger fina dragosbilder'),
	async execute(interaction) {
		interaction.reply({ content: (getRandomCover()).toString() });
	},
};

/** Function for randomly selects a cover for a Dragos issue and gets the image link
 *
 * @returns str
 */
function getRandomCover() {
	try {
		// Read the file synchronously
		const data = fs.readFileSync('cover_img_link.txt', 'utf-8');
		const cover_img_link_list = data.split('\n');
		const cover_img_link = cover_img_link_list[Math.floor(Math.random() * cover_img_link_list.length)];
		return cover_img_link;
	}
	catch (err) {
		console.error('Error reading file:', err);
	}
}