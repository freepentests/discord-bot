class DiscordApiError extends Error {
	constructor(message) {
		super(message);
		this.name = 'DiscordApiError';
	}
}

export class DiscordApi {
	static async fetch(...args) {
		const resp = await fetch(...args);
		const contentType = resp.headers.get('Content-Type');
		const status = resp.status;

		const isSuccess = status >= 200 && status <= 299; // condition for if the status code is within 200-299 range
		if (!isSuccess) throw new DiscordApiError(`Received non-2xx response code from Discord API: ${status}\nResponse: ${await resp.text()}`);

		if (contentType !== 'application/json') return resp.text();
		else return resp.json();

	}
}

