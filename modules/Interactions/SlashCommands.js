import { DiscordApi } from '../Api/DiscordApi.js';

const OPTION_TYPES = {
	STRING: 3,
	INTEGER: 4,
	BOOLEAN: 5,
	USER: 6,
	CHANNEL: 7,
	ROLE: 8
};
const CHAT_INPUT_COMMAND_TYPE = 1;

export class OptionBuilder {
	constructor() {
		this.type = null;
		this.name = null;
		this.description = null;
		this.required = true;
		this.choices = [];
	}

	setType(type) {
		this.type = type;
		return this;
	}

	setName(name) {
		this.name = name;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}

	setRequired(required) {
		this.required = required;
		return this;
	}

	addChoice(name, value) {
		this.choices.push({
			name,
			value
		});
		return this;
	}
}

export class SlashCommandBuilder {
	constructor() {
		this.name = null;
		this.type = CHAT_INPUT_COMMAND_TYPE;
		this.description = null;
		this.options = [];
	}

	setName(name) {
		// name must be all lowercase

		this.name = name;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}

	addStringOption(callback) {
		const option = new OptionBuilder()
			.setType(OPTION_TYPES.STRING); 

		callback(option);
		this.options.push(option);

		return this;
	}

	addIntegerOption(callback) {
		const option = new OptionBuilder()
			.setType(OPTION_TYPES.INTEGER); 

		callback(option);
		this.options.push(option);

		return this;
	}

	addBooleanOption(callback) {
		const option = new OptionBuilder()
			.setType(OPTION_TYPES.BOOLEAN); 

		callback(option);
		this.options.push(option);

		return this;
	}

	addUserOption(callback) {
		const option = new OptionBuilder()
			.setType(OPTION_TYPES.USER); 

		callback(option);
		this.options.push(option);

		return this;
	}

	addChannelOption(callback) {
		const option = new OptionBuilder()
			.setType(OPTION_TYPES.CHANNEL); 

		callback(option);
		this.options.push(option);

		return this;
	}

	addRoleOption(callback) {
		const option = new OptionBuilder()
			.setType(OPTION_TYPES.ROLE);

		callback(option);
		this.options.push(option);

		return this;
	}
}

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

