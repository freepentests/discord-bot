export class Profile {
	#token;

	constructor(token) {
		this.#token = token;
	}

	changeDisplayName(name) {
		return fetch('https://discord.com/api/v9/users/@me', {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			body: JSON.stringify({
	    			global_name: name
    			}),
    			method: 'PATCH',
		});
	}

	changePronouns(pronouns) {
		return fetch('https://discord.com/api/v9/users/@me/profile', {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			body: JSON.stringify({
	    			pronouns: pronouns
    			}),
    			method: 'PATCH'
		});
	}

	changeBio(bio) {
		return fetch('https://discord.com/api/v9/users/@me/profile', {
    			headers: {
        			Authorization: 'Bot ' + this.#token,
    			},
    			body: JSON.stringify({
	    			bio: bio
    			}),
    			method: 'PATCH'
		});
	}

	changeBannerColor(color) {
		return fetch('https://discord.com/api/v9/users/@me/profile', {
    			headers: {
        			Authorization: 'Bot ' + this.#token
    			},
    			body: JSON.stringify({
	    			accent_color: color
    			}),
    			method: 'PATCH'
		});
	}

	changeAvatar(avatar) {
		return fetch('https://discord.com/api/v9/users/@me', {
			headers: {
				Authorization: 'Bot ' + this.#token
			},
			body: JSON.stringify({
				avatar: avatar
			}),
			method: 'PATCH'
		})
	}
}

