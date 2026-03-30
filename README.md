# discord-bot

<img src="https://files.catbox.moe/q2oxq0.png" height="100">

Discord-bot is a library that provides an interface that makes it easier for developers to create Discord bots that automate specific tasks or respond to messages automatically.

## Installation & Setup

1. Install Node.JS from their [official website](https://nodejs.org/en/download) or via a Linux [package manager](https://en.wikipedia.org/wiki/Package_manager).
2. Import the library into one of your projects:
```js
import { Client } from './path/to/library';
```
3. Initialize Client with your bot's authorization token:
```js
const TOKEN = 'enter your bot\'s auth token here';

const client = new Client(TOKEN);
```
4. You've finished! Now you can read our documentation to learn how to use the library.

## TODO:
- [x] Add embed support
- [x] Add support for creating polls
- [x] Add support for attachments in messages
- [x] Let bots add and remove reactions
- [ ] Add support for stickers
- [ ] Make it easier for developers to update role and channel permissions
- [ ] Add more channel options such as changing a channel's name, etc
- [ ] Add documentation
- [ ] Publish to NPM

## Contribute

You can contribute to this project on [GitHub](https://github.com/freepentests). Open a pull request or create an issue, and we will do our best to review it as soon as possible.

## LICENSE

For licensing information, check the LICENSE file.

