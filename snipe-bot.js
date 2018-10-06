const MessageProcessor = require('./message-processor.js');
const DMMessageHandler = require('./dm-message-handler.js');

class SnipeBot {
  
  constructor(client) {
    this._client = client;
    this._messageProcessor = new MessageProcessor();
  }

  run() {
    this._registerMessageHandlers();
    this._addMessageProcessor();
  }

  _registerMessageHandlers() {
    this._messageProcessor.registerHandler('dm', new DMMessageHandler());
    //this._messageProcessor.registerHandler(new ChannelMessageHandler());
  }

  _addMessageProcessor() {
    this._client.on('message', this._messageProcessor.process);
  }
}

module.exports = SnipeBot;
