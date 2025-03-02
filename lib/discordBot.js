const { Client, GatewayIntentBits } = require('discord.js');
const log = require('./logger');
const config = require('../config.json');

class DiscordBot {
  constructor(token, messageHandler) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.MessageReactions] });
    this.token = token;
    this.messageHandler = messageHandler;

    this.client.on('messageCreate', (message) => this.handleMessage(message));
    this.client.on('messageReactionAdd', (reaction, user) => this.handleReaction(reaction, user));
    this.client.on('ready', () => log.info('Discord bot is ready'));
    this.client.on('error', (error) => log.error('Discord bot error:', error));
    this.client.on('reconnecting', () => log.info('Discord bot reconnecting'));
    this.client.on('disconnect', () => log.warn('Discord bot disconnected'));
  }

  async start() {
    await this.client.login(this.token);
    log.info('Discord bot logged in');
  }

  async handleMessage(message) {
    if (message.author.bot) return;
    const attachments = message.attachments.map(attachment => attachment.url);
    const replyToUser = message.reference ? message.reference.messageId : null;
    await this.messageHandler(message.author.username, message.content, attachments, [], replyToUser);
  }

  async handleReaction(reaction, user) {
    if (user.bot) return;
    await this.messageHandler(user.username, '', [], [reaction.emoji.name]);
  }

  async sendMessage(text, replyToUser = null) {
    const channel = this.client.channels.cache.find(channel => channel.isText());
    if (channel) {
      const options = {};
      if (replyToUser) {
        const message = await channel.messages.fetch(replyToUser);
        options.reply = { messageReference: message };
      }
      await channel.send(text, options);
      log.info(`Sent message to Discord: ${text}`);
    }
  }
}

module.exports = DiscordBot;