import { DiscordApi } from './discordApi.js';

export class WebhookClient {
	constructor(data) {
		if (data.url) {
			this.url = data.url;
		} else {
			this.url = `https://discord.com/api/webhooks/${data.id}/${data.token}`;
		}
	}

	send(data) {
		return DiscordApi.fetch(this.url, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
	}

	delete() {
		return DiscordApi.fetch(this.url, {
			method: 'DELETE'
		});
	}

	get() {
		return DiscordApi.fetch(this.url, {
			method: 'GET'
		});
	}
}

