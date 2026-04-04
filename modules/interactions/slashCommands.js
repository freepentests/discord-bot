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
		this.type = 1;
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
			.setType(3); // 3 is for strings

		callback(option);
		this.options.push(option);

		return this;
	}

	addIntegerOption(callback) {
		const option = new OptionBuilder()
			.setType(4); // 4 is for integers

		callback(option);
		this.options.push(option);

		return this;
	}

	addBooleanOption(callback) {
		const option = new OptionBuilder()
			.setType(5); // 5 is for booleans

		callback(option);
		this.options.push(option);

		return this;
	}

	addUserOption(callback) {
		const option = new OptionBuilder()
			.setType(6); // 6 is for users

		callback(option);
		this.options.push(option);

		return this;
	}

	addChannelOption(callback) {
		const option = new OptionBuilder()
			.setType(7); // 7 is for channels

		callback(option);
		this.options.push(option);

		return this;
	}

	addRoleOption(callback) {
		const option = new OptionBuilder()
			.setType(8); // 8 is for roles

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

