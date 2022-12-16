const Command = require('../../structures/Command');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'biblia',
      description: 'Um versículo aleatorio da biblia cristã.',
      category: 'fun',
    });
  }

  run = async (interaction) => {

    axios.get('https://labs.bible.org/api/?passage=random&type=json')
      .then(function (response) {

        const BibliaEmbed = new MessageEmbed().setColor('RANDOM').setTimestamp().setThumbnail('https://noticias-pt.aigrejadejesuscristo.org/media/orig/JesusCristo1.jpg')
        .setAuthor(response.data[0].bookname)
        .addField(`${response.data[0].chapter}:${response.data[0].verse}`, response.data[0].text)
        .setFooter('Ta em ingles msm fodase.')

        interaction.reply({ embeds: [BibliaEmbed] })
      })
      .catch(function (error) {
        interaction.reply('Não encontrei nenhum trecho agora, tente novamente mais tarde.')
        console.log('Alguem tentou dar o comando da biblia e deu erro:' + ' ' + error)
      })
  };
};
