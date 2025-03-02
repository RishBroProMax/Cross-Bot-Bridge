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
    } else if (msg.sticker) {
      await this.handleSticker(msg);
    } else {
      const replyToUser = msg.reply_to_message ? msg.reply_to_message.from.username : null;
      await this.messageHandler(msg.from.username, msg.text, [], [], replyToUser);
    }
  }

  async handleMedia(msg) {
    const mediaType = msg.photo ? 'photo' : msg.video ? 'video' : 'document';
    const fileId = msg[mediaType][msg[mediaType].length - 1].file_id;
    const fileUrl = await this.bot.getFileLink(fileId);
    const text = `${config.telegramPrefix}: ${msg.from.username} sent a ${mediaType}:\n${fileUrl}`;
    await this.messageHandler(msg.from.username, text);
  }

  async handleSticker(msg) {
    const stickerUrl = await this.bot.getFileLink(msg.sticker.file_id);
    const text = `${config.telegramPrefix}: ${msg.from.username} sent a sticker:\n${stickerUrl}`;
    await this.messageHandler(msg.from.username, text);
  }

  async sendMessage(text, replyToUser = null) {
    const options = {};
    if (replyToUser) {
      const user = Object.entries(config.userMapping).find(([discordUser, telegramUser]) => telegramUser === replyToUser);
      if (user) {
        options.reply_to_message_id = await this.bot.sendMessage(this.chatId, text, options);
      }
    }
    await this.bot.sendMessage(this.chatId, text, options);
    log.info(`Sent message to Telegram: ${text}`);
  }
}

module.exports = TelegramBotWrapper;