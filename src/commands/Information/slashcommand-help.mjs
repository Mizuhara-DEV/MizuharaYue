import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'help',
    description: 'Trả lời bằng danh sách các lệnh ứng dụng có sẵn.',
    type: 1,
    options: [],
  },
  options: {
    cooldown: 10000,
  },
  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.reply({
      content: `${client.collection.application_commands.map((cmd) => '\`/' + cmd.command.name + '\`').join(', ')}`,
    });
  },
}).data;
