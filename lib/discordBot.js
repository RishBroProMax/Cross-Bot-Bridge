const { Client, GatewayIntentBits } = require('discord.js');
const log = require('./logger');
const config = require('../config.json');

class DiscordBot {
  constructor(token, messageHandler) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
    this.token = token;
    this.messageHandler = messageHandler;

    this.client.on('messageCreate', (message) => this.handleMessage(message));
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
    if (message.attachments.size > 0) {
      await this.handleAttachments(message);
    } else {
      await this.messageHandler(message.author.username, message.content);
    }
  }

  async handleAttachments(message) {
    const attachments = message.attachments.map(attachment => attachment.url).join('\n');
    const text = `${config.discordPrefix}: ${message.author.username} sent attachments:\n${attachments}`;
    await this.messageHandler(message.author.username, text);
  }

  async sendMessage(text) {
    const channel = this.client.channels.cache.find(channel => channel.isText());
    if (channel) {
      await channel.send(text);
      log.info(`Sent message to Discord: ${text}`);
    }
  }
}

module.exports = DiscordBot;