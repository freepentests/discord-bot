export class Users {
	this.#token;

	constructor(token) {
		this.#token = token;
	}

	adoptTag(guildId, enabled = true) {
		return fetch('https://discord.com/api/v9/users/@me/clan', {
    			headers: {
        			Authorization: this.#token
    			},
    			body: JSON.stringify({
	    			identity_guild_id: String(guildId),
	    			identity_enabled: true
    			}),
    			method: 'PUT'
		});
	}

	getProfile(userId) {
		return fetch(`https://discord.com/api/v9/users/${userId}/profile`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'GET'
		});
	}

	removeFriend(userId) {
		return fetch(`https://discord.com/api/v9/users/@me/relationships/${userId}`, {
			headers: {
				Authorization: this.#token
			},
			method: 'DELETE'
		});
	}

	ignore(userId) {
		return fetch(`https://discord.com/api/v9/users/@me/relationships/${userId}/ignore`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'PUT'
		});
	}

	unignore(userId) {
		return fetch(`https://discord.com/api/v9/users/@me/relationships/${userId}/ignore`, {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'DELETE'
		});
	}

	block(userId) {
		return fetch(`https://discord.com/api/v9/users/@me/relationships/${userId}`, {
    			headers: {
        			Authorization: this.#token
    			},
			body: JSON.stringify({
				type: 2
			}),
    			method: 'PUT',
		});
	}

	unblock(userId) {
		return fetch(`https://discord.com/api/v9/users/@me/relationships/${userId}`, {
    			headers: {
        			Authorization: this.#token
    			},
			body: JSON.stringify({
				type: 2
			}),
    			method: 'DELETE',
		});
	}

	getRelationships() {
		return fetch('https://discord.com/api/v9/users/@me/relationships', {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'GET'
		});
	}

	me() {
		return fetch('https://discord.com/api/v9/users/@me', {
    			headers: {
        			Authorization: this.#token
    			},
    			method: 'GET'
		});
	}
}

