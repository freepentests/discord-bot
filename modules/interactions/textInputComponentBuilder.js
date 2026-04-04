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

