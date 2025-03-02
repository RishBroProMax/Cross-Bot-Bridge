const TelegramBot = require('node-telegram-bot-api');
const log = require('./logger');
const config = require('../config.json');

class TelegramBotWrapper {
  constructor(token, chatId, messageHandler) {
    this.bot = new TelegramBot(token, { polling: true });
    this.chatId = chatId;
    this.messageHandler = messageHandler;

    this.bot.on('message', (msg) => this.handleMessage(msg));
    this.bot.on('polling_error', (error) => log.error('Telegram bot polling error:', error));
  }

  async start() {
    log.info('Telegram bot started');
  }

  async handleMessage(msg) {
    if (msg.photo || msg.video || msg.document) {
      await this.handleMedia(msg);
    } else {
      await this.messageHandler(msg.from.username, msg.text);
    }
  }

  async handleMedia(msg) {
    const mediaType = msg.photo ? 'photo' : msg.video ? 'video' : 'document';
    const fileId = msg[mediaType][msg[mediaType].length - 1].file_id;
    const fileUrl = await this.bot.getFileLink(fileId);
    const text = `${config.telegramPrefix}: ${msg.from.username} sent a ${mediaType}:\n${fileUrl}`;
    await this.messageHandler(msg.from.username, text);
  }

  async sendMessage(text) {
    await this.bot.sendMessage(this.chatId, text);
    log.info(`Sent message to Telegram: ${text}`);
  }
}

module.exports = TelegramBotWrapper;