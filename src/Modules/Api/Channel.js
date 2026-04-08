import { Guild } from './Guild.js';
import { Message } from './Message.js';
import { DiscordApi } from './DiscordApi.js';

export class Channel {
	#token;

	constructor(token, data) {
		this.#token = token;

		Object.assign(this, data)


		this.guild = new Guild(this.#token, {
			id: this.guild_id
		});
	}

	startTyping() {
		return DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}/typing`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
	}

	getMessages(limit = 10, before = null) {
		let url = `https://discord.com/api/v10/channels/${this.id}/messages?limit=${limit}`;
		if (before) url = `https://discord.com/api/v10/channels/${this.id}/messages?limit=${limit}&before=${before}`;

		return DiscordApi.fetch(url, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			method: 'GET'
		});
	}

	async send(data) {
		return new Message(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}/messages`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'POST'
		}));
	}

	async delete() {
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'DELETE'
		}));
	}

	createInvite(maxAge = 0, maxUses = 0) {
		return DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}/invites`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				validate: null,
				max_age: maxAge,
				max_uses: maxUses,
				target_user_id: null,
				target_type: null,
				temporary: false,
				flags: 0
			}),
			method: 'POST'
		});
	}

	async setName(newName) {
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newName
			}),
			method: 'PATCH'
		}));
	}

	async setTopic(newTopic) {
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				topic: newTopic
			}),
			method: 'PATCH'
		}));
	}

	async setNsfwStatus(nsfw) {
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nsfw: nsfw
			}),
			method: 'PATCH'
		}));
	}

	async setSlowmode(seconds) {
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				rate_limit_per_user: seconds
			}),
			method: 'PATCH'
		}));
	}

	async setBitrate(bits) {
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				bitrate: bits
			}),
			method: 'PATCH'
		}));
	}

	async setUserLimit(userLimit) {
		// 0 is for no limit
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_limit: userLimit
			}),
			method: 'PATCH'
		}));
	}

	async setVideoQualityMode(mode) {
		// mode can be 1 for auto and 2 for 720p
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				video_quality_mode: mode
			}),
			method: 'PATCH'
		}));
	}

	async get() {
		return new Channel(this.#token, await DiscordApi.fetch(`https://discord.com/api/v10/channels/${this.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
			}
		}));
	}
}

