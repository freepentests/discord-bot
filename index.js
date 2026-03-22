import { Messages } from './modules/messages.js';

export class Client {
	#token;

	constructor(token) {
		this.#token = token;
		this.messages = new Messages(this.#token);
		this.ws;

		this.connect();
	}

	identify() {
		this.ws.send(JSON.stringify({
			op: 2,
			d: {
				token: this.#token,
				intents: 513,
				properties: {
         				$os: "linux",
         				$browser: "chrome",
         				$device: "chrome",
      				},
				presence: {status: 'online', afk: false},
			}
		}));
	}

	connect() {
		this.ws = new WebSocket('wss://gateway.discord.gg/?encoding=json&v=9');
		this.ws.onopen = () => {
			console.log('hi');
			this.identify();
		}

		this.ws.onmessage = async (msg) => {
			const data = JSON.parse(msg.data);
		};

		this.ws.onclose = () => console.log('bye');
	}
}

