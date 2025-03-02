# Cross Bot Bridge

[![npm version](https://badge.fury.io/js/cross-bot-bridge.svg)](https://badge.fury.io/js/cross-bot-bridge)
[![Build Status](https://travis-ci.com/RishBroProMax/cross-bot-bridge.svg?branch=main)](https://travis-ci.com/RishBroProMax/cross-bot-bridge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple and customizable cross-bot bridge package that connects Discord and Telegram with admin and owner features, auto-reconnecting, media handling, message formatting conversion, user identity mapping, emoji and reaction support, and a command system.

## Features

- **Cross-Platform Messaging**: Relay messages between Discord and Telegram.
- **Admin and Owner Features**: Special handling for messages from admins and the owner.
- **Auto-Reconnecting**: Automatically reconnects on disconnection.
- **Media Handling**: Handles images, videos, documents, and stickers.
- **Message Formatting Conversion**: Consistent message formatting across platforms.
- **User Identity Mapping**: Maps user identities between platforms.
- **Emoji and Reaction Support**: Handles emojis and reactions.
- **Unified Messaging**: Consistent message formatting across platforms.
- **Real-time Communication**: Instant message relay.
- **Secure & Reliable**: Built with security and reliability in mind.
- **Command System**: Customizable commands.
- **Multi-Cross Bridge**: Reply to messages across platforms.
- **Message Caching**: Caches messages to handle rate limits and ensure consistent message delivery.
- **Advanced Command System**: Supports complex commands and subcommands.
- **Customizable Prefixes**: Allows users to set custom prefixes for commands.
- **Low Overhead**: Lightweight and efficient.

## Installation

Install the package using npm:

```bash
npm install cross-bot-bridge
```

## Configuration

Create a `config.json` file in the root of your project with the following structure:

```json
{
  "discordToken": "YOUR_DISCORD_BOT_TOKEN",
  "telegramToken": "YOUR_TELEGRAM_BOT_TOKEN",
  "telegramChatId": "YOUR_TELEGRAM_CHAT_ID",
  "discordPrefix": "Discord",
  "telegramPrefix": "Telegram",
  "commandPrefix": "!",
  "logLevel": "info",
  "admins": ["admin1", "admin2"],
  "owner": "ownerUsername",
  "userMapping": {},
  "customPrefixes": {
    "discord": "!",
    "telegram": "/"
  },
  "messageCacheSize": 100
}
```

Replace the placeholders with your actual tokens, chat ID, admin usernames, and owner username.

## Usage

Create an `index.js` file and use the package as follows:

```javascript
const CrossBotBridge = require('cross-bot-bridge');
const bridge = new CrossBotBridge();

bridge.start();
```

Run your bot using the following command:

```bash
npm start
```

## Example

Here is an example of how you can set up the `config.json` and `index.js` files:

### config.json

```json
{
  "discordToken": "YOUR_DISCORD_BOT_TOKEN",
  "telegramToken": "YOUR_TELEGRAM_BOT_TOKEN",
  "telegramChatId": "YOUR_TELEGRAM_CHAT_ID",
  "discordPrefix": "Discord",
  "telegramPrefix": "Telegram",
  "commandPrefix": "!",
  "logLevel": "info",
  "admins": ["admin1", "admin2"],
  "owner": "ownerUsername",
  "userMapping": {},
  "customPrefixes": {
    "discord": "!",
    "telegram": "/"
  },
  "messageCacheSize": 100
}
```

### index.js

```javascript
const CrossBotBridge = require('cross-bot-bridge');
const bridge = new CrossBotBridge();

bridge.start();
```

## Contributing

We welcome contributions to the project! Here are a few ways you can help:

- Report bugs and suggest features via [GitHub Issues](https://github.com/RishBroProMax/cross-bot-bridge/issues).
- Fork the repository and submit pull requests.
- Improve documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [discord.js](https://discord.js.org/) - A powerful library for interacting with the Discord API.
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - A Telegram Bot API for Node.js.
- [loglevel](https://www.npmjs.com/package/loglevel) - A lightweight logging library for JavaScript.
- [progress](https://www.npmjs.com/package/progress) - A simple and flexible progress bar library.

---

Made with ❤️ by [RishBroProMax](https://github.com/RishBroProMax)