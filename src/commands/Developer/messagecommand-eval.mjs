import { AttachmentBuilder } from 'discord.js';

import MessageCommand from '#structure/MessageCommand.mjs';
import util from 'node:util';

export default new MessageCommand({
  command: {
    name: 'eval',
    description: 'Thực thi mã JavaScript.',
    category: 'Developer',
    aliases: ['ev'],
  },
  options: {
    botOwner: true,
  },
  run: async (client, message, args) => {
    if (!args[0]) {
      await message.reply({
        content: 'Bạn phải cung cấp mã để thực thi nó!',
      });
      return;
    }

    message = await message.reply({
      content: 'Please wait...',
    });

    const code = args.slice(0).join(' ');
    try {
      let result = eval(code);

      if (typeof result !== 'string') result = util.inspect(result);

      result = `${result}`.replace(new RegExp(client.token, 'gi'), 'CLIENT_TOKEN'); // Để tránh hiển thị mã thông báo của khách hàng cho công chúng

      await message.edit({
        content: 'Được, không có lỗi.',
        files: [
          new AttachmentBuilder(Buffer.from(`${result}`, 'utf-8'), {
            name: 'output.ts',
          }),
        ],
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
