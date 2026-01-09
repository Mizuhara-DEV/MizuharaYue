import { ApplicationCommandOptionType } from 'discord.js';

import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'autocomplete',
    description: '[LỆNH KIỂM TRA] Một ví dụ về lệnh cho tương tác Tự động hoàn thành.',
    type: 1,
    options: [
      {
        name: 'option',
        description: 'Chọn một trong các tùy chọn!',
        type: ApplicationCommandOptionType.String,
        autocomplete: true,
        required: true,
      },
    ],
  },
  options: {
    botDevelopers: true,
  },
  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const chosen = interaction.options.getString('option', true);

    await interaction.reply({
      content: `Có vẻ như bạn thích **` + chosen + '**.',
    });
  },
}).data;
