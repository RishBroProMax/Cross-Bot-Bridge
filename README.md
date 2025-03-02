# Cross Bot Bridge

[![npm version](https://badge.fury.io/js/cross-bot-bridge.png?icon=si%3Anpm)](https://badge.fury.io/js/cross-bot-bridge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple and customizable cross-bot bridge package that connects Discord and Telegram with admin and owner features.

## Features

- **Cross-Platform Messaging**: Relay messages between Discord and Telegram.
- **Admin and Owner Features**: Special handling for messages from admins and the owner.
- **Custom Prefixes**: Set custom prefixes for messages from each platform.
- **Logging**: Customized log messages for better monitoring and debugging.

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
  "logLevel": "info",
  "admins": ["admin1", "admin2"],
  "owner": "ownerUsername"
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
  "logLevel": "info",
  "admins": ["admin1", "admin2"],
  "owner": "ownerUsername"
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

---

Made with ❤️ by [RishBroProMax](https://github.com/RishBroProMax)
