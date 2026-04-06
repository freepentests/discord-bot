class EmbedAuthor {
	constructor(name, url, iconUrl) {
		this.name = name;
		this.url = url;
		this.icon_url = iconUrl;
	}
}

class EmbedFooter {
	constructor(text, iconUrl) {
		this.text = text;
		this.icon_url = iconUrl;
	}
}

class EmbedField {
	constructor(name, value, inline) {
		this.name = name;
		this.value = value;
		this.inline = inline;
	}
}

export class EmbedBuilder {
	constructor() {
		this.image = {};

		this.title = null;
		this.description = null;
		this.url = null;
		this.timestamp = null;
		this.image.url = null;
		this.color = null;
		this.fields = [];

		this.author = new EmbedAuthor(null, null, null);
		this.footer = new EmbedFooter(null, null)
	}

	setTitle(newTitle) {
		this.title = newTitle;
		return this;
	}

	setDescription(newDescription) {
		this.description = newDescription;
		return this;
	}

	setUrl(newUrl) {
		this.url = newUrl;
		return this;
	}

	setTimestamp(unixTimestamp) { // this method accepts unix timestamps because they are way easier to work with than ISO strings
		this.timestamp = new Date(unixTimestamp).toISOString(); 
		return this;
	}

	setImageUrl(newImageUrl) {
		this.image.url = newImageUrl;
		return this;
	}

	setColor(newColor) {
		if (typeof newColor === 'string') this.color = parseInt(newColor.slice(1), 16); // for people who like CSS
		else if (typeof newColor === 'number') this.color = newColor;
		else throw new TypeError('newColor must be a number or a string');
		return this;
	}

	setAuthorName(newName) {
		this.author.name = newName;
		return this;
	}

	setAuthorUrl(newUrl) {
		this.author.url = newUrl;
		return this;
	}

	setAuthorIconUrl(newIconUrl) {
		this.author.icon_url = newIconUrl;
		return this;
	}

	setFooterText(newText) {
		this.footer.text = newText;
		return this;
	}

	setFooterIconUrl(newIconUrl) {
		this.footer.icon_url = newIconUrl;
		return this;
	}

	addField(name, value, inline = false) {
		this.fields.push(new EmbedField(
			name,
			value,
			inline
		));
		return this;
	}
}

