const TelegramBot = require('node-telegram-bot-api');
const log = require('./logger');
const config = require('../config.json');

class TelegramBotWrapper {
  constructor(token, chatId, messageHandler) {
    this.bot = new TelegramBot(token, { polling: true });
    this.chatId = chatId;
    this.messageHandler = messageHandler;

    this.bot.on('message', (msg) => this.handleMessage(msg));
  }

  async start() {
    log.info('Telegram bot started');
  }

  async handleMessage(msg) {
    if (config.admins.includes(msg.from.username) || msg.from.username === config.owner) {
      log.info(`Received admin/owner message from Telegram: ${msg.from.username}: ${msg.text}`);
    } else {
      log.info(`Received message from Telegram: ${msg.from.username}: ${msg.text}`);
    }
    await this.messageHandler(msg.from.username, msg.text);
  }

  async sendMessage(text) {
    await this.bot.sendMessage(this.chatId, text);
    log.info(`Sent message to Telegram: ${text}`);
  }
}

module.exports = TelegramBotWrapper;