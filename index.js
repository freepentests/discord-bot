import { Messages } from './modules/messages.js';

export class Client {
	#token;

	constructor(token, intents = 32767) {
		this.#token = token;
		this.messages = new Messages(this.#token);
		this.intents = intents;
		this.ws;

		this.connect();
	}

	identify() {
		this.ws.send(JSON.stringify({
			op: 2,
			d: {
				token: this.#token,
				intents: this.intents,
				properties: {
         				$os: null,
         				$browser: null,
         				$device: null
      				},
				presence: {status: 'online', afk: false},
			}
		}));
	}

	addEventListener(eventName, callback) {
		this.ws.addEventListener('message', (msg) => {
			const data = JSON.parse(msg.data);

			if (data.t === eventName) callback(data.d);
		});
	}

	connect() {
		this.ws = new WebSocket('wss://gateway.discord.gg/?encoding=json&v=9');
		this.ws.onopen = () => {
			console.log('connected to gateway');
			this.identify();
		}

		this.ws.onclose = () => {
			console.log('disconnected; trying to reconnect to gateway');
			this.connect();
		}
	}
}

