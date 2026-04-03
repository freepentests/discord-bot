import { Message } from './modules/message.js';
import { Channel } from './modules/channel.js';
import { Guild } from './modules/guild.js';
import { EmbedBuilder } from './modules/embed.js';
import { PollBuilder } from './modules/poll.js';
import { Attachment } from './modules/attachment.js';
import { Emoji } from './modules/emoji.js';
import { ChannelPermissionBits, GatewayIntentBits } from './modules/bitFlags.js';
import { Interactions, Interaction, ButtonComponentBuilder, ActionRowComponentBuilder, StringSelectComponentBuilder, TextDisplayComponentBuilder, ModalBuilder, TextInputComponentBuilder, LabelComponentBuilder, StringSelectOptionBuilder } from './modules/interactions.js';

export { Message, Channel, Guild, EmbedBuilder, PollBuilder, Attachment, Interactions, Interaction, ButtonComponentBuilder, ActionRowComponentBuilder, StringSelectComponentBuilder, TextDisplayComponentBuilder, ModalBuilder, TextInputComponentBuilder, LabelComponentBuilder, StringSelectOptionBuilder, Emoji, ChannelPermissionBits, GatewayIntentBits };

export class Client {
	#token;

	constructor(token, intents = 67108863) {
		this.#token = token;
		this.intents = intents;
		this.user = {};
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

			if (data.t !== eventName) return;

			switch (data.t) {
				case 'INTERACTION_CREATE':
					callback(new Interaction(this.#token, data.d));
					break;

				case 'MESSAGE_CREATE':
					callback(new Message(this.#token, data.d));
					break;

				case 'MESSAGE_DELETE':
					callback(new Message(this.#token, data.d));
					break;

				case 'MESSAGE_UPDATE':
					callback(new Message(this.#token, data.d));
					break;

				case 'CHANNEL_CREATE':
					callback(new Channel(this.#token, data.d));
					break;

				case 'CHANNEL_DELETE':
					callback(new Channel(this.#token, data.d));
					break;

				case 'CHANNEL_UPDATE':
					callback(new Channel(this.#token, data.d));
					break;

				default:
					callback(data.d);
					break;
			}
		});
	}

	sendHeartbeat() {
		if (this.ws.readyState === 1) {
			this.ws.send(JSON.stringify({
				op: 1,
				d: null
			}));
		}
	}

	connect() {
		this.ws = new WebSocket('wss://gateway.discord.gg/?encoding=json&v=9');
		this.ws.onopen = () => {
			console.log('connected to gateway');
			this.identify();
		}

		this.ws.onmessage = (msg) => {
			const data = JSON.parse(msg.data);

			if (data.op === 0 && data.t === 'READY') {
				this.user = data.d.user;
			}

			if (data.op === 10) {
				setInterval(this.sendHeartbeat.bind(this), data.d.heartbeat_interval * (0.8 + Math.random() * 0.4));
			}
		}

		this.ws.onclose = () => {
			console.log('disconnected; trying to reconnect to gateway');
			this.connect();
		}
	}
}

