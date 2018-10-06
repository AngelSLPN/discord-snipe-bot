class DMMessageHandler {
  
  handle(message) {
    console.log('Got new message: ', message.content);
  }
}

module.exports = DMMessageHandler;
