# discord-bot-lib

<img src="https://files.catbox.moe/q2oxq0.png" height="100">

Discord-bot-lib is a modular, lightweight Discord API wrapper designed to simplify the process of developing Discord bots. Discord-bot-lib is lightweight, asynchronous, and it is dependency-free; no need to worry about your `node_modules` directory taking up half of the space on your disk.

## Installation & Setup

1. Install Node.JS from their [official website](https://nodejs.org/en/download) or via a Linux [package manager](https://en.wikipedia.org/wiki/Package_manager).
2. Clone this library onto your local device.
3. Import the library into one of your projects:
```js
import { Client } from 'discord-bot-lib';
```
4. Initialize Client with your bot's authorization token:
```js
const TOKEN = 'enter your bot\'s auth token here';

const client = new Client(TOKEN);
```
5. You've finished! Now you can read our documentation to learn how to use the library.

## TODO:
- [x] Add embed support
- [x] Add support for creating polls
- [x] Add support for attachments in messages
- [x] Let bots add and remove reactions
- [x] Add support for slash commands and message components
- [x] Make a class for an emoji object
- [x] Add more channel options such as changing a channel's name, etc
- [ ] Make it easier for developers to update role and channel permissions
- [ ] Refactor the code
- [ ] Add support for voice channels so people can make music bots and stuff
- [ ] Add support for gateway compression with zlib-stream for more efficient network transmission
- [ ] Add documentation
- [ ] Publish to NPM

## Contribute

You can contribute to this project on [GitHub](https://github.com/freepentests/discord-bot). Open a pull request or create an issue, and we will do our best to review it as soon as possible.

## LICENSE

For licensing information, check the LICENSE file.

