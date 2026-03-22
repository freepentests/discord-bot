export class Channels {
	#token;

	constructor(token) {
		this.#token = token;
	}

	createChannel(name, guildId, type = 0, categoryId = null) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
    			headers: {
        			Authorization: this.#token
    			},
			body: JSON.stringify({
				type: type,
				name: name,
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
    			method: 'DELETE'
		});
	}

	createInvite(channelId, maxAge = 0, maxUses = 0) {
		return fetch(`https://discord.com/api/v9/channels/${channelId}/invites`, {
    			headers: {
        			Authorization: this.#token
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

