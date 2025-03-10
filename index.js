// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { CronJob } = require('cron');
const getKepsReason = require('./util/getKepsReason');

const intents = [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildScheduledEvents];

// Create a new client instance
const client = new Client({ intents: intents });

client.commands = new Collection();
// Cron job for sending knölvalsskål reminders at minute 33.
client.knolvalsReminder = CronJob.from({ cronTime: '33 * * * *',
	onTick: () => {
		client.channels.cache.get(process.env.GEN_CHANNEL_ID).send('@everyone Om 1 minut är klockan 34!');
	},
	start: false });
client.kepsdagReminder = CronJob.from({ cronTime: '00 20 * * *',
	onTick: () => {
		const kepsReason = getKepsReason('reminder');
		if (kepsReason) {
			client.channels.cache.get(process.env.GEN_CHANNEL_ID).send(`@everyone ${kepsReason} imorgon, så då ska alla bära keps! :billed_cap:`);
		}
	},
	start: true,
});

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Don't load 'reload' command if in production, should not be accessible by everyone
	if (process.argv[2] == 'production') {
		const reloadIndex = commandFiles.indexOf('reload.js');
		if (reloadIndex !== -1) {
			commandFiles.splice(commandFiles.indexOf('reload.js'), 1);
		}
	}
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		{
			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			}
			else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
