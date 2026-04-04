const ACTION_ROW_COMPONENT_TYPE = 1;

export class ActionRowComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = ACTION_ROW_COMPONENT_TYPE;
		this.components = [];

		// OPTIONAL FIELDS
		this.id = null;
	}

	addComponent(component) {
		this.components.push(component);
		return this;
	}
}

