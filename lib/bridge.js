const DiscordBot = require('./discordBot');
const TelegramBot = require('./telegramBot');
const CommandHandler = require('./commandHandler');
const config = require('../config.json');
const log = require('./logger');

class CrossBotBridge {
  constructor() {
    this.discordBot = new DiscordBot(config.discordToken, this.handleDiscordMessage.bind(this));
    this.telegramBot = new TelegramBot(config.telegramToken, config.telegramChatId, this.handleTelegramMessage.bind(this));
    this.commandHandler = new CommandHandler(this);
    log.setLevel(config.logLevel);
  }

  async start() {
    await this.discordBot.start();
    await this.telegramBot.start();
    log.info('CrossBotBridge started');
  }

  async handleDiscordMessage(username, message) {
    if (message.startsWith(config.commandPrefix)) {
      this.commandHandler.handleCommand(username, message, 'discord');
    } else {
      const text = `${config.discordPrefix}: ${username}: ${message}`;
      await this.telegramBot.sendMessage(text);
    }
  }

  async handleTelegramMessage(username, message) {
    if (message.startsWith(config.commandPrefix)) {
      this.commandHandler.handleCommand(username, message, 'telegram');
    } else {
      const text = `${config.telegramPrefix}: ${username}: ${message}`;
      await this.discordBot.sendMessage(text);
    }
  }
}

module.exports = CrossBotBridge;