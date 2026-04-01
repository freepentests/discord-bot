import { DiscordApi } from './discordApi.js';
import { readFileSync } from 'fs';
import { getMimeType } from './mimeTypes.js';

export class Attachment {
	#token;

	constructor(filename, token) {
		this.data = readFileSync(filename);
		this.fileSize = this.data.length;
		this.filename = filename.split('/').slice(-1)[0];
		this.mimeType = getMimeType(this.filename);
		this.#token = token;
	}

	async upload(channelId) {
		const body = JSON.stringify({
			files: [
				{
					filename: this.filename,
					file_size: this.fileSize,
					id: null,
					is_clip: false,
					original_content_type: this.mimeType
				}
			]
		});
		const json = await DiscordApi.fetch(`https://discord.com/api/v10/channels/${channelId}/attachments`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: body,
			method: 'POST'
		});

		const uploadUrl = json.attachments[0].upload_url;
		const uploadFilename = json.attachments[0].upload_filename;

		await DiscordApi.fetch(uploadUrl, {
			headers: {
				'Content-Type': 'application/octet-stream',
			},
			body: this.data,
			method: 'PUT'
		});

		this.id = '0';
		this.original_content_type = this.mimeType;
		this.uploaded_filename = uploadFilename
	}
}

