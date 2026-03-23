export class Channel {
	#token;

	constructor(token, data) {
		this.#token = token;
		this.data = data;
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

	send(content, reference = null) {
		return fetch(`https://discord.com/api/v9/channels/${this.data.id}/messages`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				mobile_network_type: 'unknown',
				content: content,
				nonce: null,
				tts: false,
				message_reference: reference,
				flags: 0
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
}

