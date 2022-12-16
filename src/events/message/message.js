const Event = require('../../structures/Event');

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'messageCreate',
    });
  }

  run = async (message) => {
    if (
      message.content.startsWith('<@688786173698769006>' || '<!@688786173698769006>')
    ) {
      message.channel.send('Vai toma sua cu 😡');
      message.channel.send('ja falei pra tu nao me pertubar arrombado fdp do krl!!!');
    }
  };
};
