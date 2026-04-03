import { DiscordApi } from './discordApi.js';
import { Channel } from './channel.js';
import { Guild } from './guild.js'

export class ModalBuilder {
	constructor() {
		this.custom_id = null;
		this.title = null;

		this.components = [];
	}

	setTitle(title) {
		this.title = title;
		return this;
	}

	setCustomId(customId) {
		this.custom_id = customId;
		return this;
	}

	addComponent(component) {
		this.components.push(component);
		return this;
	}
}

export class TextInputComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = 4;
		this.custom_id = null;
		this.style = 1; // 1 is for single-line input, 2 is for multi-line input

		// OPTIONAL FIELDS
		this.id = null;
		this.min_length = null;
		this.max_length = null;
		this.required = null;
		this.value = null;
	}

	setCustomId(customId) {
		this.custom_id = customId;
		return this;
	}

	setStyle(style) {
		this.style = style;
		return this;
	}

	setId(id) {
		this.id = id;
		return this;
	}

	setMinLength(minLength) {
		this.min_length = minLength;
		return this;
	}

	setMaxLength(maxLength) {
		this.max_length = maxLength;
		return this;
	}

	setRequired(required) {
		this.required = required;
		return this;
	}

	setValue(value) {
		this.value = value;
		return this;
	}
}

export class LabelComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = 18;
		this.label = null;
		this.component = null;

		// OPTIONAL FIELDS
		this.id = null;
		this.description = null;
	}

	setLabel(label) {
		this.label = label;
		return this;
	}

	setComponent(component) {
		this.component = component;
		return this;
	}

	setId(id) {
		this.id = id;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}
}

export class TextDisplayComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = 10;
		this.content = null;
	}

	setContent(content) {
		this.content = content;
		return this;
	}
}

export class ButtonComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = 2;
		this.style = 1;
		this.custom_id = null;

		// OPTIONAL FIELDS
		this.id = null;
		this.label = null;
		this.emoji = null;
		this.sku_id = null;
		this.url = null;
		this.disabled = null;
	}

	setCustomId(customId) {
		this.custom_id = customId;
		return this;
	}

	setStyle(style) {
		this.style = style;
		return this;
	}

	setId(id) {
		this.id = id;
		return this;
	}

	setLabel(label) {
		this.label = label;
		return this;
	}

	setSkuId(skuId) {
		this.sku_id = skuId;
		return this;
	}

	setUrl(url) {
		this.url = url;
		return this;
	}

	setDisabled(disabled) {
		this.disabled = disabled;
		return this;
	}
}

export class ActionRowComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = 1;
		this.components = [];

		// OPTIONAL FIELDS
		this.id = null;
	}

	addComponent(component) {
		this.components.push(component);
		return this;
	}
}

export class StringSelectComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = 3;
		this.options = [];
		this.custom_id = null;

		// OPTIONAL FIELDS
		this.id = null;
		this.placeholder = null;
		this.min_values = null;
		this.max_values = null;
		this.required = null;
		this.disabled = null;
	}

	addOption(data) {
		this.options.push(data);
		return this;
	}

	setCustomId(customId) {
		this.custom_id = customId;
		return this;
	}

	setId(id) {
		this.id = id;
		return this;
	}

	setPlaceholder(placeholder) {
		this.placeholder = placeholder;
		return this;
	}

	setMinValues(minValues) {
		this.min_values = minValues;
		return this;
	}

	setMaxValues(maxValues) {
		this.max_values = maxValues;
		return this;
	}

	setRequired(required) {
		this.required = required;
		return this;
	}

	setDisabled(disabled) {
		this.disabled = disabled;
		return this;
	}
}

export class StringSelectOptionBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.label = null;
		this.value = null; // Dev-defined value of the option; max 100 characters

		// OPTIONAL FIELDS
		this.description = null;
		this.emoji = null;
		this.default = null; 
	}

	setLabel(label) {
		this.label = label;
		return this;
	}

	setValue(value) {
		this.value = value;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}

	setEmoji(emoji) {
		this.emoji = emoji;
		return this;
	}

	setDefault(isDefault) { // named this to isDefault instead of just default because default is a JavaScript keyword used in switch statements and therefore can't be the name of a parameter
		this.default = isDefault;
		return this;
	}
}

export class Interaction {
	#token;

	constructor(token, data) {
		this.#token = token;

		for (const key of Object.keys(data)) {
			this[key] = data[key];
		}

		this.channel = new Channel(this.#token, data.channel);
		this.guild = new Guild(this.#token, {
			id: data.guild_id
		});
	}

	interactionCallback(type, data) {
		return DiscordApi.fetch(`https://discord.com/api/v10/interactions/${this.id}/${this.token}/callback`, { // this.token is the interaction token, not the bot token
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: type,
				data: data
			}),
			method: 'POST'
		});
	}

	reply(data) {
		return this.interactionCallback(4, data);
	}

	displayModal(data) {
		return this.interactionCallback(9, data);
	}
}

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

