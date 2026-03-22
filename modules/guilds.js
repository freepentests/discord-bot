export class Guilds {
	this.#token;

	constructor(token) {
		this.#token = token;
	}

	ban(guildId, userId, deleteMessageSeconds) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/bans/${userId}`, {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			delete_message_seconds: deleteMessageSeconds
    			}),
    			method: 'PUT'
		});
	}

	kick(guildId, userId) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/members/${userId}?reason=`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'DELETE',
		});
	}

	timeout(guildId, userId, seconds) {
		const now = new Date();
		now.setSeconds(now.getSeconds() + seconds);
	
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/members/${userId}`, {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			communication_disabled_until: now.toISOString()
    			}),
    			method: 'PATCH',
		});
	}

	changeNickname(guildId, userId, nickname) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/members/${userId}`, {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			nick: nickname
    			}),
    			method: 'PATCH',
		});
	}

	getGuildProfile(guildId) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/profile`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'GET',
		});
	}

	changeServerName(guildId, name) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/profile`, {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			name: name,
	    			visibility: 0
    			}),
    			method: 'PATCH'
		});
	}

	changeServerDescription(guildId, description) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/profile`, {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			description: description,
	    			visibility: 0
    			}),
    			method: 'PATCH'
		});
	}
	
	changeServerIcon(guildId, icon) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/profile`, {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			icon: icon,
	    			visibility: 0
    			}),
    			method: 'PATCH'
		});
	}

	unban(guildId, userId) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/bans/${userId}`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'DELETE'
		});
	}

	createEmoji(guildId, image, name) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/emojis`, {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			image: image,
	    			name: name
    			})
    			method: 'POST'
		});
	}

	deleteEmoji(guildId, emojiId) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/emojis/${emojiId}`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'DELETE'
		});
	}
}

