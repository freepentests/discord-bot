export class ChannelPermissionBits {
	// https://docs.discord.com/developers/topics/permissions

	static CREATE_INSTANT_INVITE = 1 << 0;
	static KICK_MEMBERS = 1 << 1;
	static BAN_MEMBERS = 1 << 2;
	static ADMINISTRATOR = 1 << 3;
	static MANAGE_CHANNELS = 1 << 4;
	static MANAGE_GUILD = 1 << 5;
	static ADD_REACTIONS = 1 << 6;
	static VIEW_AUDIT_LOG = 1 << 7;
	static PRIORITY_SPEAKER = 1 << 8;
	static STREAM = 1 << 9;
	static VIEW_CHANNEL = 1 << 10;
	static SEND_MESSAGES = 1 << 11;
	static SEND_TTS_MESSAGES = 1 << 12;
	static MANAGE_MESSAGES = 1 << 13;
	static EMBED_LINKS = 1 << 14;
	static ATTACH_FILES = 1 << 15;
	static READ_MESSAGE_HISTORY = 1 << 16;
	static MENTION_EVERYONE = 1 << 17;
	static USE_EXTERNAL_EMOJIS = 1 << 18;
	static VIEW_GUILD_INSIGHTS = 1 << 19;
	static CONNECT = 1 << 20;
	static SPEAK = 1 << 21;
	static MUTE_MEMBERS = 1 << 22;
	static DEAFEN_MEMBERS = 1 << 23;
	static MOVE_MEMBERS = 1 << 24;
	static USE_VAD = 1 << 25;
	static CHANGE_NICKNAME = 1 << 26;
	static MANAGE_NICKNAMES = 1 << 27;
	static MANAGE_ROLES = 1 << 28;
	static MANAGE_WEBHOOKS = 1 << 29;
	static MANAGE_GUILD_EXPRESSIONS = 1 << 30;
	static USE_APPLICATION_COMMANDS = 1 << 31;
	static REQUEST_TO_SPEAK = 1 << 32;
	static MANAGE_EVENTS = 1 << 33;
	static MANAGE_THREADS = 1 << 34;
	static CREATE_PUBLIC_THREADS = 1 << 35;
	static CREATE_PRIVATE_THREADS = 1 << 36;
	static USE_EXTERNAL_STICKERS = 1 << 37;
	static SEND_MESSAGES_IN_THREADS = 1 << 38;
	static USE_EMBEDDED_ACTIVITIES = 1 << 39;
	static MODERATE_MEMBERS = 1 << 40;
	static VIEW_CREATOR_MONETIZATION_ANALYTICS = 1 << 41;
	static USE_SOUNDBOARD = 1 << 42;
	static CREATE_GUILD_EXPRESSIONS = 1 << 43;
	static CREATE_EVENTS = 1 << 44;
	static USE_EXTERNAL_SOUNDS = 1 << 45;
	static SEND_VOICE_MESSAGES = 1 << 46;
	static SEND_POLLS = 1 << 49;
	static USE_EXTERNAL_APPS = 1 << 50;
	static PIN_MESSAGES = 1 << 51;
	static BYPASS_SLOWMODE = 1 << 52;
}

export class GatewayIntentBits {
	// https://docs.discord.com/developers/events/gateway#list-of-intents

	static GUILDS = 1 << 0;
	static GUILD_MEMBERS = 1 << 1;
	static GUILD_MODERATION = 1 << 2;
	static GUILD_EXPRESSIONS = 1 << 3;
	static GUILD_INTEGRATIONS = 1 << 4;
	static GUILD_WEBHOOKS = 1 << 5;
	static GUILD_INVITES = 1 << 6;
	static GUILD_VOICE_STATES = 1 << 7;
	static GUILD_PRESENCES = 1 << 8;
	static GUILD_MESSAGES = 1 << 9;
	static GUILD_MESSAGE_REACTIONS = 1 << 10;
	static GUILD_MESSAGE_TYPING = 1 << 11;
	static DIRECT_MESSAGES = 1 << 12;
	static DIRECT_MESSAGE_REACTIONS = 1 << 13;
	static DIRECT_MESSAGE_TYPING = 1 << 14;
	static MESSAGE_CONTENT = 1 << 15;
	static GUILD_SCHEDULED_EVENTS = 1 << 16;
	static AUTO_MODERATION_CONFIGURATION = 1 << 17;
	static AUTO_MODERATION_EXECUTION = 1 << 18;
	static GUILD_MESSAGE_POLLS = 1 << 19;
	static DIRECT_MESSAGE_POLLS = 1 << 20;
}

