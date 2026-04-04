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

	setLabel(label) {
		this.label = label;
		return this;
	}

	setSkuId(skuId) {
		this.sku_id = skuId;
		return this;
	}

	setUrl(url) {
		this.url = url;
		return this;
	}

	setDisabled(disabled) {
		this.disabled = disabled;
		return this;
	}
}

