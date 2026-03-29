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
		this.color = 0x000000;
		this.fields = [];

		this.author = new EmbedAuthor(null, null, null);
		this.footer = new EmbedFooter(null, null)
	}

	setTitle(newTitle) {
		this.title = newTitle;
	}

	setDescription(newDescription) {
		this.description = newDescription;
	}

	setUrl(newUrl) {
		this.url = newUrl;
	}

	setTimestamp(unixTimestamp) { // this method accepts unix timestamps because they are way easier to work with than ISO strings
		this.timestamp = new Date(unixTimestamp).toISOString(); 
	}

	setImageUrl(newImageUrl) {
		this.image.url = newImageUrl;
	}

	setColor(newColor) {
		if (typeof newColor === 'string') this.color = parseInt(newColor.slice(1), 16); // for people who like CSS
		else if (typeof newColor === 'number') this.color = newColor;
		else throw new TypeError('newColor must be a number or a string');
	}

	setAuthorName(newName) {
		this.author.name = newName;
	}

	setAuthorUrl(newUrl) {
		this.author.url = newUrl;
	}

	setAuthorIconUrl(newIconUrl) {
		this.author.icon_url = newIconUrl;
	}

	addField(name, value, inline = false) {
		this.fields.push(new EmbedField(
			name,
			value,
			inline
		));
	}
}

