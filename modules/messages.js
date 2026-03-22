export class Messages {
	this.#token;

	constructor(token) {
		this.#token = token
	}

	startTyping(channelId) {
		return fetch(`https://discord.com/api/v9/channels/${channelId}/typing`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'POST'
		});
	}

	sendMessage(channelId, content, reference = null) {
		return fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
    			headers: {
        			Authorization: this.#token
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

	deleteMessage(channelId, messageId) {
		return fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'DELETE'
		});
	}

	editMessage(channelId, messageId, newContent) {
		return fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
    			headers: {
        			Authorization: this.#token
    			},
			body: JSON.stringify({
				content: newContent
			}),
    			method: 'PATCH'
		});
	}

	getMessages(channelId, limit, before = null) {
		let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=${limit}`;
		if (before) url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=${limit}&before=${before}`;

		return fetch(url, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'GET'
		});
	}
}

