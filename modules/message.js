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

	reply() {return}

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
}

