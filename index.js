import { Message } from './modules/Api/Message.js';
import { Channel } from './modules/Api/Channel.js';
import { Interaction } from './modules/Interactions/Interaction.js';

export * from './modules/Api/Guild.js';
export * from './modules/Api/Attachment.js';
export * from './modules/Api/Message.js';
export * from './modules/Api/Channel.js';

export * from './modules/BitFlags/GatewayIntentBits.js';
export * from './modules/BitFlags/RolePermissionBits.js';

export * from './modules/Interactions/ActionRowComponentBuilder.js';
export * from './modules/Interactions/ButtonComponentBuilder.js';
export * from './modules/Interactions/Interaction.js';
export * from './modules/Interactions/LabelComponentBuilder.js';
export * from './modules/Interactions/ModalBuilder.js';
export * from './modules/Interactions/SlashCommands.js';
export * from './modules/Interactions/StringSelectComponentBuilder.js';
export * from './modules/Interactions/TextDisplayComponentBuilder.js';
export * from './modules/Interactions/TextInputComponentBuilder.js';

export * from './modules/Objects/Embed.js';
export * from './modules/Objects/Poll.js';
export * from './modules/Objects/Emoji.js';

export * from './modules/Webhooks/Webhook.js'; 

const GATEWAY_OPCODES = {
	DISPATCH: 0,
	HEARTBEAT: 1,
	IDENTIFY: 2,
	HELLO: 10
};
const GATEWAY_URL = 'wss://gateway.discord.gg/?encoding=json&v=9';
const ALL_INTENTS = 67108863;

export class Client {
	#token;

	constructor(token, intents = ALL_INTENTS) {
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
			op: GATEWAY_OPCODES.IDENTIFY,
			d: {
				token: this.#token,
				intents: this.intents,
				presence: {status: 'online', afk: false},
				properties: {}
			}
		});
	}

	addEventListener(eventType, callback) {
		if (!this.events[eventType]) {
			this.events[eventType] = [];
		}

		this.events[eventType].push(callback);
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

	#handleGatewayPacket(packet) {
		if (!this.events[packet.eventType]) return;

		const eventInstance = this.#constructEventInstance(packet);
		this.events[packet.eventType].forEach((callback) => callback(eventInstance));
	}

	sendHeartbeat() {
		if (this.ws.readyState === 1) {
			this.sendPacket({
				op: GATEWAY_OPCODES.HEARTBEAT,
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

		this.ws.addEventListener('message', (packet) => {
			const json = JSON.parse(packet.data);
			const opcode = json.op;
			const eventType = json.t;
			const data = json.d;

			if (opcode === GATEWAY_OPCODES.DISPATCH && eventType === 'READY') this.user = data.user;
			if (opcode === GATEWAY_OPCODES.HELLO) this.beginHeartbeatInterval(data.heartbeat_interval);

			this.#handleGatewayPacket({
				opcode,
				eventType,
				data
			});
		});
	}
}

