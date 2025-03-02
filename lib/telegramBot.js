const TelegramBot = require('node-telegram-bot-api');
const log = require('loglevel');

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
    await this.messageHandler(msg.from.username, msg.text);
  }

  async sendMessage(text) {
    await this.bot.sendMessage(this.chatId, text);
  }
}

module.exports = TelegramBotWrapper;