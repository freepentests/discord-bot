import { DiscordApi } from './DiscordApi.js';
import { getMimeType } from './MimeTypes.js';
import { readFileSync } from 'fs';

export class Attachment {
	#token;

	constructor(filename, token) {
		this.data = readFileSync(filename);
		this.fileSize = this.data.length;
		this.filename = filename.split('/').slice(-1)[0];
		this.mimeType = getMimeType(this.filename);
		this.#token = token;
	}

	async createAttachment(channelId) {
		// We create the attachment, but we don't upload anything to it; that's handled in our uploadAttachmentData method.

		const json = await DiscordApi.fetch(`https://discord.com/api/v10/channels/${channelId}/attachments`, {
			headers: {
				Authorization: 'Bot ' + this.#token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				files: [
					{
						filename: this.filename,
						file_size: this.fileSize,
						original_content_type: this.mimeType
						id: null,
						is_clip: false,
					}
				]
			}),
			method: 'POST'
		});

		return {
			uploadUrl: json.attachments[0].upload_url,
			uploadFilename: json.attachments[0].upload_filename;
		}
	}

	async uploadAttachmentData(attachment) {
		await DiscordApi.fetch(attachmentData.uploadUrl, {
			headers: {
				'Content-Type': 'application/octet-stream',
			},
			body: this.data,
			method: 'PUT'
		});

		this.id = '0';
		this.original_content_type = this.mimeType;
		this.uploaded_filename = attachmentData.uploadFilename
	}

	async upload(channelId) {
		const attachment = this.createAttachment(channelId);
		this.uploadAttachmentData(attachment);
	}
}

