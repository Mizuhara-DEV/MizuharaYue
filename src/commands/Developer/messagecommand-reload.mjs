import { AttachmentBuilder } from 'discord.js';

import MessageCommand from '#structure/MessageCommand.mjs';
import { development } from '#configs/config.mjs';

export default new MessageCommand({
  command: {
    name: 'reload',
    description: 'Tải lại mọi lệnh.',
    category: 'Developer',
    aliases: [],
  },
  options: {
    botDevelopers: true,
  },
  run: async (client, message, args) => {
    message = await message.reply({
      content: 'Please wait...',
    });

    try {
      client.commands_handler.reload();

      await client.commands_handler.registerApplicationCommands(development);

      await message.edit({
        content: 'Đã tải lại thành công lệnh ứng dụng và lệnh tin nhắn.',
      });
    } catch (err) {
      await message.edit({
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
