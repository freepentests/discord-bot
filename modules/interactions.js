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
	}

	setCustomId(customId) {
		this.custom_id = customId;
	}

	addComponent(component) {
		this.components.push(component);
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
	}

	setStyle(style) {
		this.style = style;
	}

	setId(id) {
		this.id = id;
	}

	setMinLength(minLength) {
		this.min_length = minLength;
	}

	setMaxLength(maxLength) {
		this.max_length = maxLength;
	}

	setRequired(required) {
		this.required = required;
	}

	setValue(value) {
		this.value = value;
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
	}

	setComponent(component) {
		this.component = component;
	}

	setId(id) {
		this.id = id;
	}

	setDescription(description) {
		this.description = description;
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
	}

	setStyle(style) {
		this.style = style;
	}

	setId(id) {
		this.id = id;
	}

	setLabel(label) {
		this.label = label;
	}

	setSkuId(skuId) {
		this.sku_id = skuId;
	}

	setUrl(url) {
		this.url = url;
	}

	setDisabled(disabled) {
		this.disabled = disabled;
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
	}

	setCustomId(customId) {
		this.custom_id = customId;
	}

	setId(id) {
		this.id = id;
	}

	setPlaceholder(placeholder) {
		this.placeholder = placeholder;
	}

	setMinValues(minValues) {
		this.min_values = minValues;
	}

	setMaxValues(maxValues) {
		this.max_values = maxValues;
	}

	setRequired(required) {
		this.required = required;
	}

	setDisabled(disabled) {
		this.disabled = disabled;
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
	}

	setValue(value) {
		this.value = value;
	}

	setDescription(description) {
		this.description = description;
	}

	setEmoji(emoji) {
		this.emoji = emoji;
	}

	setDefault(isDefault) { // named this to isDefault instead of just default because default is a JavaScript keyword used in switch statements and therefore can't be the name of a parameter
		this.default = isDefault;
	}
}

export class Interaction {
	#token;

	constructor(token, data) {
		this.#token = token;

		this.interactionToken = data.token;
		this.id = data.id;
		this.member = data.member;
		this.message = data.message;
		this.channel = new Channel(this.#token, data.channel);
		this.guild = new Guild(this.#token, {
			id: data.guild_id
		});
		this.data = data.data;
	}

	interactionCallback(type, data) {
		return fetch(`https://discord.com/api/v10/interactions/${this.id}/${this.interactionToken}/callback`, {
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

export class Interactions {
	static registerGlobalSlashCommand(applicationId, token, name, description = null, options = []) {
		// https://docs.discord.com/developers/interactions/application-commands
		return fetch(`https://discord.com/api/v10/applications/${applicationId}/commands`, {
			headers: {
				Authorization: 'Bot ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name, 
				type: 1,
				description: description,
				options: options
			}),
			method: 'POST'
		});
	}
}

