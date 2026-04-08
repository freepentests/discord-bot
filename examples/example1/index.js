import { Client, MessageFlags } from '../../src/index.js';

const client = new Client('put your bot token here');

client.addEventListener('MESSAGE_CREATE', (message) => {
	if (message.author.bot) return;

	if (message.content === '!ping') {
		// message.timestamp is an ISO string, so we need to convert it to a Unix timestamp first
		const createdTimestamp = new Date(message.timestamp).getTime();

		return message.reply({
			content: `pong, latency: ${Date.now() - createdTimestamp}ms`
		}); 
	}

	if (message.content.startsWith('!say')) {
		const textToSend = message.content.split(' ').slice(1).join(' ');

		return message.channel.send({
			content: textToSend
		});
	}
});

client.addEventListener('INTERACTION_CREATE', (interaction) => {
	if (interaction.data.name !== 'timeout') return; 

	const userIdToTimeout = interaction.data.options[0].value;
	const duration = interaction.data.options[1]?.value ?? 5;

	const durationInSeconds = duration * 60;
	interaction.guild.timeout(userIdToTimeout, durationInSeconds);

	interaction.reply({
		content: `Timed out <@${userIdToTimeout}> for ${duration ?? 5} minutes.`,
		flags: MessageFlags.Ephemeral
	});
});

client.connect();

