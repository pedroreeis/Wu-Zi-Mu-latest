const Command = require('../../structures/Command');
const { createCanvas, loadImage } = require('canvas');

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

    const width = 467;
    const height = 400;
    const posX = 30; 

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const background = await loadImage('https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/perfeito.png');
    ctx.drawImage(background, 0, 0, width, height);

    const avatar = await loadImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
    ctx.drawImage(avatar, height - 177, posX+20, height - 178, height - 179)

    const attachment = new this.client.utils.attach(canvas.toBuffer(), 'perfeito.png');
    interaction.reply({ 
      content: user.username,
      files: [attachment],
      ephemeral: false
     });
  };
};
