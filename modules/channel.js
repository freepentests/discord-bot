import { Guild } from './guild.js';

export class Channel {
	#token;

	constructor(token, data) {
		this.#token = token;
		this.data = data;

		this.guild = new Guild(this.#token, {
			id: this.data.guild_id
		});
	}

	startTyping() {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}/typing`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
	}

	getMessages(limit = 10, before = null) {
		let url = `https://discord.com/api/v9/channels/${this.data.id}/messages?limit=${limit}`;
		if (before) url = `https://discord.com/api/v9/channels/${this.data.id}/messages?limit=${limit}&before=${before}`;

		return fetch(url, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			method: 'GET'
		});
	}

	send(data) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}/messages`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				mobile_network_type: 'unknown',
				nonce: null,
				tts: false,
				message_reference: reference,
				flags: 0,
				...data
			}),
			method: 'POST'
		});
	}

	delete() {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'DELETE'
		});
	}

	createInvite(maxAge = 0, maxUses = 0) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}/invites`, {
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

	setName(newName) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newName
			}),
			method: 'PATCH'
		});
	}

	setTopic(newTopic) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				topic: newTopic
			}),
			method: 'PATCH'
		});
	}

	setNsfwStatus(nsfw) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nsfw: nsfw
			}),
			method: 'PATCH'
		});
	}

	setSlowmode(seconds) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				rate_limit_per_user: seconds
			}),
			method: 'PATCH'
		});
	}

	setBitrate(bits) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				bitrate: bits
			}),
			method: 'PATCH'
		});
	}

	setUserLimit(userLimit) {
		// 0 is for no limit
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_limit: userLimit
			}),
			method: 'PATCH'
		});
	}

	setVideoQualityMode(mode) {
		// mode can be 1 for auto and 2 for 720p
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				video_quality_mode: mode
			}),
			method: 'PATCH'
		});
	}

	get() {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
			}
		});
	}
}

