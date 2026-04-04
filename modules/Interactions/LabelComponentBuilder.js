const LABEL_COMPONENT_TYPE = 18;

export class LabelComponentBuilder {
	constructor() {
		// REQUIRED FIELDS
		this.type = LABEL_COMPONENT_TYPE;
		this.label = null;
		this.component = null;

		// OPTIONAL FIELDS
		this.id = null;
		this.description = null;
	}

	setLabel(label) {
		this.label = label;
		return this;
	}

	setComponent(component) {
		this.component = component;
		return this;
	}

	setId(id) {
		this.id = id;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}
}

