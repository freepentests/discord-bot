import { Channel } from './channel.js';
import { Message } from './message.js';

class DiscordApiError extends Error {
	constructor(message) {
		super(message);
		this.name = 'DiscordApiError';
	}
}

export class DiscordApi {
	static async fetch(...args) {
		const resp = await fetch(...args);
		const contentType = resp.headers.get('content-type');
		const status = resp.status;

		if (status - 200 < 0 || status - 200 >= 100) throw new DiscordApiError(`Received non-2xx response code from Discord API: ${status}\nResponse: ${await resp.text()}`);

		if (contentType !== 'application/json') return resp.text();
		else return resp.json();

	}
}

