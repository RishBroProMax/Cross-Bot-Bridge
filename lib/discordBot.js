const { Client, GatewayIntentBits } = require('discord.js');
const log = require('loglevel');

class DiscordBot {
  constructor(token, messageHandler) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
    this.token = token;
    this.messageHandler = messageHandler;

    this.client.on('messageCreate', (message) => this.handleMessage(message));
  }

  async start() {
    await this.client.login(this.token);
    log.info('Discord bot logged in');
  }

  async handleMessage(message) {
    if (message.author.bot) return;
    await this.messageHandler(message.author.username, message.content);
  }

  async sendMessage(text) {
    const channel = this.client.channels.cache.find(channel => channel.isText());
    if (channel) {
      await channel.send(text);
    }
  }
}

module.exports = DiscordBot;