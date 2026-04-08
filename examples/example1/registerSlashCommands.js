import { SlashCommands, SlashCommandBuilder } from '../../src/index.js';

const token = 'put your bot token here';
const botId = 'put your bot id here';

const timeoutSlashCommand = new SlashCommandBuilder()
	.setName('timeout')
	.setDescription('Times out a specified user.')
	.addUserOption((option) => {
		option.setName('user')
			.setRequired(true)
			.setDescription('The user you want to time out');
	})
	.addIntegerOption((option) => {
		option.setName('duration')
			.setRequired(false)
			.setDescription('The duration in minutes to time out a user for. Defaults to 5 minutes');
	});

SlashCommands.registerGlobalSlashCommand(timeoutSlashCommand, botId, token);

