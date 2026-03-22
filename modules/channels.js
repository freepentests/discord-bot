export class Channels {
	this.#token;

	constructor(token) {
		this.#token = token;
	}

	createChannel(name, guildId, categoryId = null) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
    			headers: {
        			Authorization: this.#token
    			},
			body: JSON.stringify({
				type: 0,
				name: name
				permission_overwrites: [],
				parent_id: categoryId
			}),
    			method: 'POST'
		});
	}

	deleteChannel(channelId) {
		return fetch(`https://discord.com/api/v9/channels/${channelId}`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'DELETE',
		});
	}
}

