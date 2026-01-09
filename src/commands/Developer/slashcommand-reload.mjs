import { AttachmentBuilder, ChatInputCommandInteraction } from 'discord.js';

import ApplicationCommand from '#structure/ApplicationCommand.mjs';
import { development } from '#configs/config.mjs';

export default new ApplicationCommand({
  command: {
    name: 'reload',
    description: 'Tải lại mọi lệnh.',
    type: 1,
    options: [],
  },
  options: {
    botDevelopers: true,
  },
  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.deferReply();

    try {
      client.commands_handler.reload();

      await client.commands_handler.registerApplicationCommands(development);

      await interaction.editReply({
        content: 'Đã tải lại thành công lệnh ứng dụng và lệnh tin nhắn.',
      });
    } catch (err) {
      await interaction.editReply({
        content: 'Đã xảy ra lỗi.',
        files: [
          new AttachmentBuilder(Buffer.from(`${err}`, 'utf-8'), {
            name: 'output.ts',
          }),
        ],
      });
    }
  },
}).data;
