import { DiscordApi } from './discordApi.js';

export class Webhook {
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
			body: JSON.stringify(data),
			method: 'POST'
		});
	}

	changeName(name) {
		return DiscordApi.fetch(this.url, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name
			}),
			method: 'PATCH'
		});
	}

	changeAvatar(avatar) {
		return DiscordApi.fetch(this.url, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar
			}),
			method: 'PATCH'
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

	getMessage(messageId) {
		return DiscordApi.fetch(`${this.url}/messages/${messageId}`, {
			method: 'GET'
		});
	}

	deleteMessage(messageId) {
		return DiscordApi.fetch(`${this.url}/messages/${messageId}`, {
			method: 'DELETE'
		});
	}

	editMessage(messageId, newData) {
		return DiscordApi.fetch(`${this.url}/messages/${messageId}`, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newData),
			method: 'PATCH'
		});
	}
}

