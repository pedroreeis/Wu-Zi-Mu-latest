const Command = require('../../structures/Command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      description: 'Mostra as informações básicas de um user.',
      category: 'info',
      options: [
        {
          name: 'user',
          type: 'USER',
          description: 'Quem vai ser o perfeito da vez.',
          required: false,
        },
      ],
    });
  }

  run = async (interaction) => {
    let author = interaction.options.getMember('user') || interaction.member;

    const profileImage = await this.client.utils.canvas.perfil({author})
    const attachment = new this.client.utils.attach(profileImage, 'perfil.png');
    interaction.reply({ 
      files: [attachment],
      ephemeral: false
     });
  };
};
