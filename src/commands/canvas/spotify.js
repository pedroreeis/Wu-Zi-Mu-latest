const Command = require('../../structures/Command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'spotify',
      description: 'Veja a música que algúem está escutando!',
      category: 'info',
      options: [
        {
          name: 'user',
          type: 'USER',
          description: 'Quem vai ser o ouvinte da vez.',
          required: false,
        },
      ],
    });
  }

  run = async (interaction) => {
    let user = interaction.options.getMember('user') || interaction.member;

    if(user.presence.activities == "Spotify") {

      const spotifyInfo = user.presence.activities[0]
      const spotify = await this.client.utils.canvas.spotify({spotifyInfo})
      const attachment = new this.client.utils.attach(spotify, 'spotify.png')
      interaction.reply({ 
        files: [attachment],
        ephemeral: false
       });
    }else {
      interaction.reply({ 
        content: `Não está escutando nada no Spotify.`,
        ephemeral: false
       });
    }    
  };
};
