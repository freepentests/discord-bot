import { Client } from '../../src/index.js';

const client = new Client('put your token here');

client.addEventListener('MESSAGE_CREATE', (message) => {
	if (message.author.bot) return;

	if (message.content === '!ping') {
		// message.timestamp is an ISO string, so we need to convert it to a Unix timestamp first
		const createdTimestamp = Number(new Date(message.timestamp));

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

client.connect();

