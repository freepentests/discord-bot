export class Emoji {
	constructor(emoji) {
		if (isNaN(Number(emoji))) {
			this.name = emoji;
		} else {
			this.name = '';
			this.id = emoji;
		}
	}
}

