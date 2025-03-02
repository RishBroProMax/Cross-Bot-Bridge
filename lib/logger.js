const log = require('loglevel');
const prefix = require('loglevel-plugin-prefix');

prefix.reg(log);
prefix.apply(log, {
  format(level, name, timestamp) {
    return `[${timestamp}] [${level.toUpperCase()}]`;
  },
});

module.exports = log;