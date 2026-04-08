import { DiscordApi } from '../Api/DiscordApi.js';
import { Channel } from '../Api/Channel.js';
import { Guild } from '../Api/Guild.js';

const CALLBACK_TYPES = {
	CHANNEL_MESSAGE: 4,
	MODAL: 9
};

export class Interaction {
	#token;

	constructor(token, data) {
		this.#token = token;

		Object.assign(this, data)

		this.channel = new Channel(this.#token, data.channel);
		this.guild = new Guild(this.#token, {
			id: data.guild_id
		});
	}

	#interactionCallback(type, data) {
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
		return this.#interactionCallback(CALLBACK_TYPES.CHANNEL_MESSAGE, data);
	}

	displayModal(data) {
		return this.#interactionCallback(CALLBACK_TYPES.MODAL, data);
	}
}

