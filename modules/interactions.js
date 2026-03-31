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

export class Interaction {
	#token;

	constructor(token, data) {
		this.#token = token;

		this.interactionToken = data.token;
		this.id = data.id;
		this.data = data.data;
	}

	reply(data) {
		return fetch(`https://discord.com/api/v10/interactions/${this.id}/${this.interactionToken}/callback`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: 4,
				data: data
			}),
			method: 'POST'
		});
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

