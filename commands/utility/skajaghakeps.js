const axios = require('axios');
const cheerio = require('cheerio');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skajaghakeps')
		.setDescription('För dig som undrar om du ska ha keps på dig'),
	async execute(interaction) {
		interaction.channel.send({ content: (await daysUntilPropellerkeps()).toString() });
	},
};

// TODO add support for different LP
/**
 * Calculates and prints how many days until you should wear propellerkeps aswells as the orientation
 *
 * @returns str
 */
async function daysUntilPropellerkeps() {
	const url = 'https://xn--lsvecka-5wa.nu/';

	try {
		// Step 1: Send a GET request to the website
		const response = await axios.get(url);

		// Step 2: Parse the HTML content with cheerio
		const $ = cheerio.load(response.data);

		// Step 3: Extract information
		// For example, get the page title and process it
		const title = $('title').text();
		const läsvecka = parseInt(title.split(' ')[1], 10);
		// Sunday = 0, so add 1 to match weekday indexing
		const läsdag = new Date().getDay() + 1;

		if (`${läsvecka}${läsdag}` === '34' || (läsvecka - 1) * 5 + läsdag === 34) {
			return '@everyone Du ska ha på dig propellerkeps idag!!';
		}
		else if (`${läsvecka}${läsdag}` === '43') {
			return '@everyone Du ska ha på dig propellerkeps *baklänges* idag!!';
		}
		else if (läsvecka < 4) {
			return `Det är ${(3 - läsvecka) * 7 + 4 - läsdag} dagar kvar tills du ska ha på dig propellerkeps`;
		}
		else if (läsvecka < 5) {
			return `Det är ${(4 - läsvecka) * 7 + 5 - läsdag} dagar kvar tills du ska ha på dig propellerkeps *baklänges*`;
		}
		else if (läsvecka < (läsvecka - 1) * 5 + läsdag) {
			return `Det är ${34 - (läsvecka - 1) * 5 - läsdag} dagar kvar tills du ska ha på dig propellerkeps`;
		}
		else {
			return `Det är ${(3 + 9 - läsvecka) * 7 + 4 - läsdag} dagar kvar tills du ska ha på dig propellerkeps`;
		}
	}
	catch (error) {
		return `Failed to retrieve the page. Error: ${error.message}`;
	}
}

