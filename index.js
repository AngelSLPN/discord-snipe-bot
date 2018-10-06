const Discord = require('discord.js');
const config = require('./config.js');
const SnipeBot = require('./snipe-bot');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Connection to Discord is ready!');
  const snipeBot = new SnipeBot(client);
  snipeBot.run();
});

client.login(config.discordBotToken);
