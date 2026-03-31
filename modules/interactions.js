export class Interaction {
	#token;

	constructor(token, data) {
		this.#token = token;

		this.interactionToken = data.token;
		this.id = data.id;
	}

	reply(content) {
		return fetch(`https://discord.com/api/v10/interactions/${this.id}/${this.interactionToken}/callback`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: 4,
				data: {
					content: content
				}
			}),
			method: 'POST'
		});
	}
}

export class Interactions {
	static registerGlobalSlashCommand(applicationId, token, name, description = null, options = []) {
		// https://docs.discord.com/developers/interactions/application-commands
		return fetch(`https://discord.com/api/v10/applications/${applicationId}/commands`, {
			headers: {
				Authorization: 'Bot ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name, 
				type: 1,
				description: description,
				options: options
			}),
			method: 'POST'
		});
	}
}

