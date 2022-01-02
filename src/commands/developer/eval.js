const Command = require('../../structures/Command');
const { inspect } = require('util');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Executa algumas funções de desenvolvedor.',
      category: 'developer',
      options: [
        {
          name: 'codigo',
          type: 'STRING',
          description: 'O que o comando vai executar.',
          required: true,
        },
      ],
    });
  }

  run = async (interaction) => {
    if (interaction.user.id != '640195412648788018') return;

    let code = interaction.options.data[0].value;
    let result;

    try {
      const evaled = await eval(code);
      result = inspect(evaled, { depth: 0 }).replace(
        this.client.token,
        '*'.repeat(this.client.token.length)
      );
    } catch (error) {
      result = error.toString();
    }

    if (result.includes(this.client.token))
      return interaction.reply({
        content: '*'.repeat(this.client.token.length),
        ephemeral: true,
      });

    interaction.reply({
      content: '```' + result + '```',
      ephemeral: true,
    });
  };
};
