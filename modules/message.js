import { Channel } from './channel.js';
import { Guild } from './guild.js';

export class Message {
	#token;

	constructor(token, data) {
		this.#token = token;
		this.data = data;

		this.guild = new Guild(this.#token, {
			id: this.data.guild_id
		});
		this.channel = new Channel(this.#token, {
			id: this.data.channel_id
		});
	}

	reply(content, optionalArgs = null) {
		return this.channel.send(content, {
			channel_id: this.channel.id,
			guild_id: this.guild.id,
			message_id: this.data.id
		}, optionalArgs)
	}

	delete() {
		return fetch(`https://discord.com/api/v9/channels/${this.data.channel_id}/messages/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			method: 'DELETE'
		});
	}

	editMessage(newContent) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.channel_id}/messages/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: newContent
			}),
			method: 'PATCH'
		});
	}

	react(emoji) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.channel_id}/messages/${this.data.id}/reactions/${emoji}/@me`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'PUT'
		});
	}

	unreact(emoji) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.channel_id}/messages/${this.data.id}/reactions/${emoji}/@me`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'DELETE'
		});
	}

	get() {
		return fetch(`https://discord.com/api/v9/channels/${this.data.channel_id}/messages/${this.data.id}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
			method: 'GET'
		});
	}
}

