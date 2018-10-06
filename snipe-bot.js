const MessageProcessor = require('./message-processor.js');
const DMMessageHandler = require('./dm-message-handler.js');
const config = require('./config');

class SnipeBot {
  
  constructor(client) {
    this._client = client;
    this._messageProcessor = new MessageProcessor();
    this._lookupChannels();
    this._askForSoloCodes();
  }

  _lookupChannels() {
    this._soloCodesChannel = this._client.channels.find(
      channel => channel.name === config.codeChannels.solo
    );

    if(this._soloCodesChannel) {
      console.log('Solo Codes channel has been registered');
    }
  }

  run() {
    this._registerMessageHandlers();
    this._addMessageProcessor();
  }

  _registerMessageHandlers() {
    this._messageProcessor.registerHandler('dm', new DMMessageHandler());
  }

  _addMessageProcessor() {
    this._client.on('message', this._messageProcessor.process);
  }

  async _askForSoloCodes() {
    try {
      const message = await this._soloCodesChannel.send('Now accepting game codes');

      if(message) {
        const collector = this._soloCodesChannel.createMessageCollector(
          message => message.content.length === 3,
          { time: 20000 } // TODO: move to config
        );
    
        collector.on('collect', message => console.log('Collected', message.content));
        collector.on('end', collected => console.log(`collected ${collected.size} codes`));
      }
    } catch(err) {
      console.error(err);
    }
  }
}

module.exports = SnipeBot;
