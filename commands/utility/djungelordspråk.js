const fs = require('fs');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('djungelordspråk')
		.setDescription('Sprider Dragos visa ord'),
	async execute(interaction) {
		interaction.reply({ content: (getRandomDjungelordspråk()).toString() });
	},
};

/** Function for randomly select a djungelordspråk from a predefined text file
 *
 * @returns str
 */
function getRandomDjungelordspråk() {
	try {
		// Read the file synchronously
		const data = fs.readFileSync('djungelordspråk.txt', 'utf-8');
		const djungelordspråkList = data.split('\n');
		// Remove the last empty element if it exists
		djungelordspråkList.pop();
		const ordspråk = djungelordspråkList[Math.floor(Math.random() * djungelordspråkList.length)];
		return ordspråk;
	}
	catch (err) {
		console.error('Error reading file:', err);
	}
}
