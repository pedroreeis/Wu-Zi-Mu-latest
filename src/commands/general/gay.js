const Command = require('../../structures/Command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'gay',
      description: 'Teste se você ou alguém pertence a classe dos LGBT+ ou não.',
      category: 'fun',
      options: [
        {
          name: 'user',
          type: 'STRING',
          description: 'Quem o teste irá averiguar.',
          required: true,
        },
      ],
    });
  }

  run = async (interaction) => {
    let user = this.client.users.cache.get(interaction.options.data[0].value) || interaction.options.data[0].value;
    let value = Math.floor(Math.random() * 100) + 1

    let result;
    if(value <= 5) {
      result = `
      🏳️‍🌈 **NUSSA! ${user} é ${value}% GAY.** 🏳️‍🌈 
      🥶 **MAIS HÉTERO IMPOSSÍVEL!**🥶`
    }else if (value > 5 && value < 50) {
      result = `
      🏳️‍🌈 **Éhh! ${user} é ${value}% GAY.** 🏳️‍🌈 
      💞 **NÃO FOI DESSA VEZ, MAS FICA ESPERTO!**💞`
    }else if (value >= 50) {
      result = `
      🏳️‍🌈 **WOW!! ${user} é ${value}% GAY.** 🏳️‍🌈 
      💞 **BEM VINDE AO TIME!!!**💞`
    }

    interaction.reply({
      content: `
        🏳️‍🌈 **HMM!!!! SERÁ QUE ENCONTRAMOS UM NOVO GAY?**🏳️‍🌈 
      
      ${result}
      `,
      ephemeral: false,
    });
  };
};
