const config = require('../config.json');
const log = require('./logger');

class UserMapping {
  static updateUserMapping(discordUsername, telegramUsername) {
    if (!config.userMapping[discordUsername]) {
      config.userMapping[discordUsername] = telegramUsername;
      log.info(`User mapping updated: ${discordUsername} -> ${telegramUsername}`);
    }
  }

  static getTelegramUsername(discordUsername) {
    return config.userMapping[discordUsername] || discordUsername;
  }

  static getDiscordUsername(telegramUsername) {
    const entry = Object.entries(config.userMapping).find(([_, tgUsername]) => tgUsername === telegramUsername);
    return entry ? entry[0] : telegramUsername;
  }
}

module.exports = UserMapping;