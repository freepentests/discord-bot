import { DiscordApi } from './DiscordApi.js';
import { Channel } from './Channel.js';
import { Guild } from './Guild.js';

export class Message {
	#token;

	constructor(token, data) {
		this.#token = token;

		for (const key of Object.keys(data)) {
			this[key] = data[key];
		}

		this.guild = new Guild(this.#token, {
			id: this.guild_id
		});
		this.channel = new Channel(this.#token, {
			id: this.channel_id
		});
	}

	reply(data) {
		return this.channel.send({
			message_reference: {
				channel_id: this.channel.id,
				guild_id: this.guild.id,
				message_id: this.id
			},
			...data
		});
	}

	async delete() {
		return new Message(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.channel_id}/messages/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			method: 'DELETE'
		}));
	}

	async editMessage(newContent) {
		return new Message(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.channel_id}/messages/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: newContent
			}),
			method: 'PATCH'
		}));
	}

	react(emoji) {
		return DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.channel_id}/messages/${this.id}/reactions/${emoji}/@me`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'PUT'
		});
	}

	unreact(emoji) {
		return DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.channel_id}/messages/${this.id}/reactions/${emoji}/@me`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'DELETE'
		});
	}

	async get() {
		return new Message(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.channel_id}/messages/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'GET'
		}));
	}
}

