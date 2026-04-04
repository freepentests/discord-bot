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

