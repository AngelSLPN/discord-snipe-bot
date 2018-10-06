class MessageProcessor {

  constructor() {
    this._handlers = {};
    this.process = this.process.bind(this);
  }
  
  registerHandler(type, handler) {
    this._handlers[type] = handler;
  }

  process(message) {
    if(this._handlers[message.channel.type]) {
      this._handlers[message.channel.type].handle(message);
    }
  }
}

module.exports = MessageProcessor;
