const TEXT_INPUT_COMPONENT_TYPE = 4;

export const TEXT_INPUT_STYLES = {
	SINGLE_LINE: 1,
	MULTI_LINE: 2
};

export class TextInputComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = TEXT_INPUT_COMPONENT_TYPE;
		this.custom_id = null;
		this.style = TEXT_INPUT_STYLES.SINGLE_LINE;

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

