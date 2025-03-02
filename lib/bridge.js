const DiscordBot = require('./discordBot');
const TelegramBot = require('./telegramBot');
const config = require('../config.json');
const log = require('./logger');

class CrossBotBridge {
  constructor() {
    this.discordBot = new DiscordBot(config.discordToken, this.handleDiscordMessage.bind(this));
    this.telegramBot = new TelegramBot(config.telegramToken, config.telegramChatId, this.handleTelegramMessage.bind(this));
    log.setLevel(config.logLevel);
  }

  async start() {
    await this.discordBot.start();
    await this.telegramBot.start();
    log.info('CrossBotBridge started');
  }

  async handleDiscordMessage(username, message) {
    if (config.admins.includes(username) || username === config.owner) {
      log.info(`Admin/Owner message from Discord: ${username}: ${message}`);
    } else {
      log.info(`Message from Discord: ${username}: ${message}`);
    }
    const text = `${config.discordPrefix}: ${username}: ${message}`;
    await this.telegramBot.sendMessage(text);
  }

  async handleTelegramMessage(username, message) {
    if (config.admins.includes(username) || username === config.owner) {
      log.info(`Admin/Owner message from Telegram: ${username}: ${message}`);
    } else {
      log.info(`Message from Telegram: ${username}: ${message}`);
    }
    const text = `${config.telegramPrefix}: ${username}: ${message}`;
    await this.discordBot.sendMessage(text);
  }
}

module.exports = CrossBotBridge;