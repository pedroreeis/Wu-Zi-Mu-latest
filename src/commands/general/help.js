const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'Mostra todos os comandos do bot.',
      category: 'general',
    });
  }

  run = (interaction) => {
    const HelpEmbed = new MessageEmbed()
      .setAuthor({
        name: this.client.user.tag,
        iconURL: this.client.user.avatarURL(),
      })
      .setDescription(
        `Olá, eu sou responsável por deixar tudo em ordem no discord do clan, pode ficar tranquilo!`
      )
      .setColor('RED')
      .setFooter({
        text: 'Sistema de proteção exclusivo da proDRIFT',
        iconURL: this.client.user.avatarURL(),
      });

    const commands = this.client.commands.map((a) => a.name).join(', ');
    HelpEmbed.addField('⭐ Comandos', `\`${commands}\``);

    interaction.reply({
      embeds: [HelpEmbed],
      ephemeral: true,
    });
  };
};
