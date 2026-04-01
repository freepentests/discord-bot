import { Channel } from './channel.js';
import { Message } from './message.js';

class DiscordApiError extends Error {
	constructor(message) {
		super(message);
		this.name = 'DiscordApiError';
	}
}

export class DiscordApi {
	static async fetch(token, ...args) {
		const resp = await fetch(...args);
		const contentType = resp.headers.get('content-type');
		const status = resp.status;

		if (status - 200 < 0 || status - 200 >= 100) throw new DiscordApiError(`Received non-2xx response code from Discord API: ${status}`)

		if (contentType !== 'application/json') {
			return resp.text();
		} else {
			const json = await resp.json();
			return DiscordApi.getObject(token, json);
		}
		
	}

	static getObject(token, json) {
		const keys = Object.keys(json);

		if (keys.includes('content')) {
			return new Message(token, json);
		}

		if (keys.includes('last_message_id')) {
			return new Channel(token, json);
		}

		if (keys.includes('joined_at')) {
			return new User(token, json);
		}

		if (keys.includes('mentionable')) {
			return new Role(token, json);
		}

		return json
	}
}

