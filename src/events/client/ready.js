const Event = require('../../structures/Event');

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'ready',
    });
  }

  run = async () => {
    console.log(`Agora o servidor da proDRIFT está protegido.`);
    this.client.registryCommands();
  };
};
