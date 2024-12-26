const { REST, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
require('dotenv').config();
const [clientId, guildId, token] = [process.env.CLIENT_ID, process.env.GUILD_ID, process.env.DISCORD_TOKEN];
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Don't register 'reload' command if in production
	if (process.argv[2] == 'production') {
		const reloadIndex = commandFiles.indexOf('reload.js');
		if (reloadIndex !== -1) {
			commandFiles.splice(commandFiles.indexOf('reload.js'), 1);
		}
	}
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	// If production, remove all guild commands and register all loaded commands globally.
	// If development, don't touch global commands and only reload guild commands
	if (process.argv[2] == 'production') {
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
			.then(() => console.log('Successfully deleted all guild commands.'))
			.catch(console.error);

		try {
			const data = await rest.put(Routes.applicationCommands(clientId), { body:commands });
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		}
		catch (error) {
			console.error(error);
		}
	}
	else {
		try {
			const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body:commands });
			console.log(`Successfully reloaded ${data.length} guild (/) commands.`);
		}
		catch (error) {
			console.error(error);
		}
	}
})();