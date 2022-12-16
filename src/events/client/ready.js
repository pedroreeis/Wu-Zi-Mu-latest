const Event = require('../../structures/Event');

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'ready',
    });
  }

  run = async () => {
    this.client.registryCommands();
    this.client.user.setActivity('Criado pra ser engraçado, simples assim.')
    //await this.client.db.connect();
  };
};
