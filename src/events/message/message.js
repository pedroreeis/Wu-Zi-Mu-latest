const Event = require('../../structures/Event');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'messageCreate',
    });
  }

  run = async (message) => {
    if (
      message.content.startsWith(`<@!${this.client.user.id}>`) ||
      message.content.startsWith(`<@${this.client.user.id}>`)
    ) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('proDRIFT Guard')
        .setDescription(
          'Olá, o meu papel aqui no clan é certificar que todos os membros possam usufruir do discord com todos os conteúdos.\n Eu certifico também que aqueles que não estão no clan não veja nada que ele não possa!'
        )
        .setImage(
          'https://media.discordapp.net/attachments/706520738416427060/927407542668234802/por_supuesto.gif'
        );

      message.channel.send({ embeds: [embed] });
    }
  };
};
