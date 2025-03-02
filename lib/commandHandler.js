const log = require('./logger');
const config = require('../config.json');

class CommandHandler {
  constructor(bridge) {
    this.bridge = bridge;
  }

  handleCommand(username, message, platform) {
    const prefix = config.customPrefixes[platform] || config.commandPrefix;
    const [command, ...args] = message.slice(prefix.length).split(' ');

    switch (command.toLowerCase()) {
      case 'ping':
        this.sendReply(username, 'Pong!', platform);
        break;
      case 'echo':
        this.sendReply(username, args.join(' '), platform);
        break;
      // Add more commands as needed
      default:
        log.warn(`Unknown command: ${command}`);
        this.sendReply(username, `Unknown command: ${command}`, platform);
    }
  }

  sendReply(username, reply, platform) {
    const text = `${config[`${platform}Prefix`]}: ${username}: ${reply}`;
    if (platform === 'discord') {
      this.bridge.telegramBot.sendMessage(text);
    } else if (platform === 'telegram') {
      this.bridge.discordBot.sendMessage(text);
    }
  }
}

module.exports = CommandHandler;