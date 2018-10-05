const Discord = require('discord.js');
const config = require('./config.js');
const client = new Discord.Client();

const listenForSnipeCodes = (channel, message) => {
  console.log('Sent message: ', message);
  const collector = channel.createMessageCollector(() => true, {time: 10000});
  collector.on('collect', m => console.log('Collected: ', m.content));
  collector.on('end', collected => console.log('Collected number of messages: ', collected.size));
};

client.on('ready', () => {
  console.log('we are good to go');

  client.channels.forEach(channel => {
    if (channel.type === 'text') {
      if (channel.name === 'general') {
        channel.sendMessage('Snipe codes can be entered now')
          .then(message => listenForSnipeCodes(channel, message))
          .catch(console.error);
      }
    }
  });
});

client.on('message', message => {
  console.log(message.content);
});

client.login(config.discordBotToken);
