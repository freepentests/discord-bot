import { DiscordApi } from '../Api/DiscordApi.js';

export class SlashCommands {
	static registerGlobalSlashCommand(data, applicationId, token) {
		// https://docs.discord.com/developers/interactions/application-commands

		return DiscordApi.fetch(`https://discord.com/api/v10/applications/${applicationId}/commands`, {
			headers: {
				Authorization: 'Bot ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'POST'
		});
	}

	static registerGuildSlashCommand(data, applicationId, guildId, token) {
		return DiscordApi.fetch(`https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`, {
			headers: {
				Authorization: 'Bot ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'POST'
		});
	}

	static deleteGlobalSlashCommand(applicationId, commandId, token) {
		return DiscordApi.fetch(`https://discord.com/api/v10/applications/${applicationId}/commands/${commandId}`, {
			headers: {
				Authorization: 'Bot ' + token
			},
			method: 'DELETE'
		});
	}

	static deleteGuildSlashCommand(applicationId, guildId, commandId, token) {
		return DiscordApi.fetch(`https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, {
			headers: {
				Authorization: 'Bot ' + token
			},
			method: 'DELETE'
		});
	}
}

