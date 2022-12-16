const Command = require('../../structures/Command');

const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ajuda',
      description: 'Lista todos os comandos do bot.',
      category: 'general',
    });
  }

  run = async (interaction) => {
    
    const EmbedHelp = new MessageEmbed()
      .setDescription(`**Aqui está todos os comandos que o Reis colocou em mim** 😏🏳️‍🌈`)
      .setTimestamp() 
      .setThumbnail(this.client.user.displayAvatarURL());

      this.client.commands.map(command => {
        EmbedHelp.addField(`🫦 ${command.category.toUpperCase()}`, `**${command.name}**`)
      })


    interaction.reply({
      embeds: [EmbedHelp],
      ephemeral: false,
    });
  };
};
