export class Roles {
	#token;

	constructor(token) {
		this.#token = token;
	}

	async getRoles(guildId, userId) {
		const resp = await fetch(`https://discord.com/api/v9/users/${userId}/profile?guild_id=${guildId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'GET'
		});
		const response = await resp.json();

		return new Set(response.guild_member.roles);
	}

	async addRole(guildId, roleId, userId) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/members/${userId}`, {
  			headers: {
       				Authorization: 'Bot ' + this.#token
    			},
    			body: JSON.stringify({
				roles: [
					...await this.getRoles(guildId, userId),
					String(roleId)
				]
			}),
    			method: 'PATCH'
		});
	}

	async removeRole(guildId, roleId, userId) {
		const roles = await this.getRoles(guildId, userId);
		roles.delete(roleId);

		return fetch(`https://discord.com/api/v9/guilds/${guildId}/members/${userId}`, {
  			headers: {
       				Authorization: 'Bot ' + this.#token
    			},
    			body: JSON.stringify({
				roles: [
					...roles
				]
			}),
    			method: 'PATCH'
		});
	}

	createRole(guildId, name = 'new role', color = 0x000000) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/roles`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
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

	updateRolePerms(guildId, roleId, permissions) {
		// perms are at https://docs.discord.com/developers/topics/permissions
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/roles/${roleId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			body: JSON.stringify({
				permissions: permissions
			}),
    			method: 'PATCH',
		});
	}

	deleteRole(guildId, roleId) {
		return fetch(`https://discord.com/api/v9/guilds/${guildId}/roles/${roleId}`, {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			method: 'DELETE',
		});
	}
}

