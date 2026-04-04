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

