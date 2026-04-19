import { Message } from './Modules/Api/Message.js';
import { Channel } from './Modules/Api/Channel.js';
import { Interaction } from './Modules/Interactions/Interaction.js';
import { GatewayIntentBits, GatewayOpcodes } from 'discord-api-types/v10';
import { EventEmitter } from 'events';
import { WebSocket } from 'ws';

export * from 'discord-api-types/v10';

export * from './Modules/Api/Guild.js';
export * from './Modules/Api/Attachment.js';
export * from './Modules/Api/Message.js';
export * from './Modules/Api/Channel.js';

export * from './Modules/Builders/ActionRowComponentBuilder.js';
export * from './Modules/Builders/ButtonComponentBuilder.js';
export * from './Modules/Builders/LabelComponentBuilder.js';
export * from './Modules/Builders/ModalBuilder.js';
export * from './Modules/Builders/StringSelectComponentBuilder.js';
export * from './Modules/Builders/TextDisplayComponentBuilder.js';
export * from './Modules/Builders/TextInputComponentBuilder.js';
export * from './Modules/Builders/PollBuilder.js';
export * from './Modules/Builders/EmbedBuilder.js';
export * from './Modules/Builders/SlashCommandBuilder.js';

export * from './Modules/Interactions/Interaction.js';
export * from './Modules/Interactions/SlashCommands.js';

export * from './Modules/Emojis/Emoji.js';
export * from './Modules/Webhooks/Webhook.js'; 

const GATEWAY_URL = `wss://gateway.discord.gg/?encoding=json&v=10`;
const ALL_INTENTS = Object.values(GatewayIntentBits).reduce((acc, intent) => acc | intent, 0);

export class Client extends EventEmitter {
	#token;

	constructor(token, intents = ALL_INTENTS) {
		super();

		this.#token = token;
		this.intents = intents;
		this.user = {};
		this.events = {};
		this.ws = null;
	}

	sendPacket(jsonData) {
		this.ws.send(JSON.stringify(jsonData));
	}

	identify() {
		this.sendPacket({
			op: GatewayOpcodes.Identify,
			d: {
				token: this.#token,
				intents: this.intents,
				presence: {status: 'online', afk: false},
				properties: {}
			}
		});
	}

	#constructEventInstance(packet) {
		switch (packet.eventType) {
			case 'INTERACTION_CREATE':
				return new Interaction(this.#token, packet.data);

			case 'MESSAGE_CREATE':
			case 'MESSAGE_DELETE':
			case 'MESSAGE_UPDATE':
				return new Message(this.#token, packet.data);

			case 'CHANNEL_CREATE':
			case 'CHANNEL_DELETE':
			case 'CHANNEL_UPDATE':
				return new Channel(this.#token, packet.data);

			default:
				return packet.data;
		}
	}

	#handleGatewayPacket(data) {
		if (data.opcode === GatewayOpcodes.Hello) this.beginHeartbeatInterval(data.data.heartbeat_interval);

		const eventInstance = this.#constructEventInstance(data);
		this.emit(data.eventType, eventInstance);
	}

	sendHeartbeat() {
		const isConnected = this.ws.readyState === 1;

		if (isConnected) {
			this.sendPacket({
				op: GatewayOpcodes.Heartbeat,
				d: null
			});
		}
	}

	beginHeartbeatInterval(heartbeatInterval) {
		const jitter = heartbeatInterval * (0.8 + Math.random() * 0.4);

		setInterval(this.sendHeartbeat.bind(this), jitter);
	}

	onWsOpen() {
		console.log('connected to gateway; identifying');
		this.identify();
	}

	onWsClose() {
		console.log('disconnected; attempting to reconnect to gateway');
		this.connect();
	}

	connect() {
		this.ws = new WebSocket(GATEWAY_URL);

		this.ws.addEventListener('open', this.onWsOpen.bind(this));
		this.ws.addEventListener('close', this.onWsClose.bind(this));

		this.on('READY', (data) => {
			this.user = data.user;
		});

		this.ws.addEventListener('message', (packet) => {
			const json = JSON.parse(packet.data);
			const opcode = json.op;
			const eventType = json.t;
			const data = json.d;


			this.#handleGatewayPacket({
				opcode,
				eventType,
				data
			});
		});
	}
}

