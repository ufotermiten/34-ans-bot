const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('förslag')
		.setDescription('Skriv ett förslag på en ny funktion eller en ändring du vill se på servern!')
		.addStringOption(option =>
			option
				.setName('titel')
				.setDescription('Vad ska ditt förslag heta?')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('beskrivning')
				.setDescription('Vad består ditt förslag av?')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('motivering')
				.setDescription('Varför är ditt förslag ett bra förslag?')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('namn')
				.setDescription('Vad heter du?')
				.setRequired(true)),
	async execute(interaction) {
		const suggestion = { title: interaction.options.getString('titel'),
			desc: interaction.options.getString('beskrivning'),
			justif: interaction.options.getString('motivering'),
			name: interaction.options.getString('namn'),
		};

		const owner = 'ufotermiten';
		const repo = '34-ans-bot';
		const body = `## Beskrivning\n${suggestion.desc}\n## Motivering\n${suggestion.justif}\n### Namn\n${suggestion.name}`;

		const { Octokit } = await import('@octokit/core');

		const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

		// defer replying until response from GitHub API
		await interaction.deferReply();

		const res = await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
  		owner: owner,
  		repo: repo,
  		title: suggestion.title,
  		body: body,
  		labels: [
    		'suggestion',
  		],
  		headers: {
    		'X-GitHub-Api-Version': '2022-11-28',
  		},
		});
		const url = res.data.html_url;
		// send the correct reply
		await interaction.editReply(`Tack för förslaget ${interaction.member.displayName}! Du kan se status på ditt förslag [här](${url}).`);
	},
};
