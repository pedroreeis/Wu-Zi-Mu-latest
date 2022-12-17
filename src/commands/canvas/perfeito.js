const Command = require('../../structures/Command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'perfeito',
      description: 'Mostre a todos que alguém é perfeito <3',
      category: 'fun',
      options: [
        {
          name: 'user',
          type: 'USER',
          description: 'Quem vai ser o perfeito da vez.',
          required: true,
        },
      ],
    });
  }

  run = async (interaction) => {
    let user = interaction.options.getUser('user');
    let url = user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });

    const perfeito = await this.client.utils.canvas.perfeito(url)
    const attachment = new this.client.utils.attach(perfeito, 'perfeito.png');
    interaction.reply({ 
      content: user.username,
      files: [attachment],
      ephemeral: false
     });
  };
};
