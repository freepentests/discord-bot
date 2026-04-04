const TEXT_DISPLAY_COMPONENT_TYPE = 10;

export class TextDisplayComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = TEXT_DISPLAY_COMPONENT_TYPE;
		this.content = null;
	}

	setContent(content) {
		this.content = content;
		return this;
	}
}

