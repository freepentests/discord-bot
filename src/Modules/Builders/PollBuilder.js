export class PollBuilder {
	constructor() {
		this.allow_multiselect = false;
		this.question = {
			text: null
		};
		this.answers = [];
		this.duration = 24; // duration is in hours
	}

	setText(newText) {
		this.question.text = newText;
		return this;
	}

	setDuration(newDuration) {
		// note: max is 768
		this.duration = newDuration;
		return this;
	}

	setMultiselectEnabled(multiselectEnabled) {
		this.allow_multiselect = multiselectEnabled;
		return this;
	}

	addAnswer(text, emoji) {
		const pollMedia = {
			text: text
		};
		if (emoji) pollMedia.emoji = emoji;

		this.answers.push({
			poll_media: pollMedia
		});

		return this;
	}
}

