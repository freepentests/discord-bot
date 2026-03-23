export class Guild {
	#token;

	constructor(token, data) {
		this.#token = token;
		this.data = data
	}

	async getRoles(userId) {
		const resp = await fetch(`https://discord.com/api/v9/users/${userId}/profile?guild_id=${this.data.id}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'GET'
		});
		const response = await resp.json();

		return new Set(response.guild_member.roles);
	}

	async addRole(roleId, userId) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/members/${userId}`, {
  			headers: {
       				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
				roles: [
					...await this.getRoles(userId),
					String(roleId)
				]
			}),
    			method: 'PATCH'
		});
	}

	async removeRole(roleId, userId) {
		const roles = await this.getRoles(userId);
		roles.delete(roleId);

		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/members/${userId}`, {
  			headers: {
       				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
				roles: [
					...roles
				]
			}),
    			method: 'PATCH'
		});
	}

	createRole(name = 'new role', color = 0x000000) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/roles`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
				name: name,
				color: color,
				colors: {
					primary_color: color,
					secondary_color: null,
					tertiary_color: null
				},
				permissions: '0'
			}),
    			method: 'POST'
		});
	}

	updateRolePerms(roleId, permissions) {
		// perms are at https://docs.discord.com/developers/topics/permissions
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/roles/${roleId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
				permissions: permissions
			}),
    			method: 'PATCH',
		});
	}

	deleteRole(roleId) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/roles/${roleId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'DELETE',
		});
	}

	ban(userId, deleteMessageSeconds) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/bans/${userId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
	    			delete_message_seconds: deleteMessageSeconds
    			}),
    			method: 'PUT'
		});
	}

	kick(userId) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/members/${userId}?reason=`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
    			},
    			method: 'DELETE',
		});
	}

	timeout(userId, seconds) {
		const now = new Date();
		now.setSeconds(now.getSeconds() + seconds);
	
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/members/${userId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
	    			communication_disabled_until: now.toISOString()
    			}),
    			method: 'PATCH',
		});
	}

	untimeout(userId) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/members/${userId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
	    			communication_disabled_until: null
    			}),
    			method: 'PATCH',
		});
	}

	changeNickname(userId, nickname) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/members/${userId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
	    			nick: nickname
    			}),
    			method: 'PATCH',
		});
	}

	unban(userId) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/bans/${userId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'DELETE'
		});
	}

	createEmoji(name, image) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/emojis`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify({
	    			image: image,
	    			name: name
    			}),
    			method: 'POST'
		});
	}

	deleteEmoji(emojiId) {
		return fetch(`https://discord.com/api/v9/guilds/${this.data.id}/emojis/${emojiId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'DELETE'
		});
	}
}

