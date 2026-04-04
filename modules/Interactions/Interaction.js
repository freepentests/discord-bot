import { DiscordApi } from '../Api/DiscordApi.js';

export class Interaction {
	#token;

	constructor(token, data) {
		this.#token = token;

		for (const key of Object.keys(data)) {
			this[key] = data[key];
		}

		this.channel = new Channel(this.#token, data.channel);
		this.guild = new Guild(this.#token, {
			id: data.guild_id
		});
	}

	interactionCallback(type, data) {
		return DiscordApi.fetch(`https://discord.com/api/v10/interactions/${this.id}/${this.token}/callback`, { // this.token is the interaction token, not the bot token
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: type,
				data: data
			}),
			method: 'POST'
		});
	}

	reply(data) {
		return this.interactionCallback(4, data);
	}

	displayModal(data) {
		return this.interactionCallback(9, data);
	}
}

