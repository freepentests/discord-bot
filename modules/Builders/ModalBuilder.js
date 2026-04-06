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

