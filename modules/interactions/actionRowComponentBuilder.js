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

