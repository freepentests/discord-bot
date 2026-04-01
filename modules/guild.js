import { DiscordApi } from './discordApi.js';

export class Guild {
	#token;

	constructor(token, data) {
		this.#token = token;

		for (const key of Object.keys(data)) {
			this[key] = data[key];
		}
	}

	async addRole(roleId, userId) {
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/members/${userId}/roles/${roleId}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'PUT'
		});
	}

	async removeRole(roleId, userId) {
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/members/${userId}/roles/${roleId}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'DELETE'
		});
	}

	createRole(name = 'new role', color = 0x000000) {
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/roles`, {
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
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/roles/${roleId}`, {
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
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/roles/${roleId}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'DELETE',
		});
	}

	createChannel(name, type = 0, categoryId = null) {
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/channels`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
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

	ban(userId, deleteMessageSeconds) {
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/bans/${userId}`, {
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
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/members/${userId}?reason=`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
			},
			method: 'DELETE',
		});
	}

	timeout(userId, seconds) {
		const now = new Date();
		now.setSeconds(now.getSeconds() + seconds);

		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/members/${userId}`, {
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
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/members/${userId}`, {
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
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/members/${userId}`, {
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
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/bans/${userId}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'DELETE'
		});
	}

	createEmoji(name, image) {
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/emojis`, {
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
		return DiscordApi.fetch(this.#token, `https://discord.com/api/v9/guilds/${this.id}/emojis/${emojiId}`, {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			method: 'DELETE'
		});
	}
}

