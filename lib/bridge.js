const DiscordBot = require('./discordBot');
const TelegramBot = require('./telegramBot');
const CommandHandler = require('./commandHandler');
const UserMapping = require('./userMapping');
const MessageCache = require('./messageCache');
const config = require('../config.json');
const log = require('./logger');

class CrossBotBridge {
  constructor() {
    this.discordBot = new DiscordBot(config.discordToken, this.handleDiscordMessage.bind(this));
    this.telegramBot = new TelegramBot(config.telegramToken, config.telegramChatId, this.handleTelegramMessage.bind(this));
    this.commandHandler = new CommandHandler(this);
    this.messageCache = new MessageCache(config.messageCacheSize);
    log.setLevel(config.logLevel);
  }

  async start() {
    await this.discordBot.start();
    await this.telegramBot.start();
    log.info('CrossBotBridge started');
  }

  async handleDiscordMessage(username, message, attachments = [], reactions = [], replyToUser = null) {
    if (message.startsWith(config.customPrefixes.discord)) {
      this.commandHandler.handleCommand(username, message, 'discord');
    } else {
      const telegramUsername = UserMapping.getTelegramUsername(username);
      const formattedMessage = this.formatMessage(telegramUsername, message, attachments, reactions, 'discord');
      await this.telegramBot.sendMessage(formattedMessage, replyToUser);
      if (replyToUser) {
        UserMapping.updateUserMapping(username, replyToUser);
      }
    }
  }

  async handleTelegramMessage(username, message, media = [], reactions = [], replyToUser = null) {
    if (message.startsWith(config.customPrefixes.telegram)) {
      this.commandHandler.handleCommand(username, message, 'telegram');
    } else {
      const discordUsername = UserMapping.getDiscordUsername(username);
      const formattedMessage = this.formatMessage(discordUsername, message, media, reactions, 'telegram');
      await this.discordBot.sendMessage(formattedMessage, replyToUser);
      if (replyToUser) {
        UserMapping.updateUserMapping(replyToUser, username);
      }
    }
  }

  formatMessage(username, message, media, reactions, platform) {
    let formattedMessage = `${config[`${platform}Prefix`]}: ${username}: ${message}`;
    if (media.length > 0) {
      formattedMessage += `\nMedia:\n${media.join('\n')}`;
    }
    if (reactions.length > 0) {
      formattedMessage += `\nReactions: ${reactions.join(' ')}`;
    }
    return formattedMessage;
  }
}

module.exports = CrossBotBridge;