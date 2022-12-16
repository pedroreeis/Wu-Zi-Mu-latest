const Command = require('../../structures/Command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ontime',
      description: 'Quanto tempo será que eu estou online?',
      category: 'general',
    });
  }

  run = async (interaction) => {

    const uptime = this.client.utils.mstohours(this.client.uptime);
    
    interaction.reply({
      content: `Estou online à ${uptime} 😏😘`,
      ephemeral: false,
    });
  };
};
