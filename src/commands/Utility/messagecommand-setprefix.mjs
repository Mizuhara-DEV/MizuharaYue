import MessageCommand from '#structure/MessageCommand.mjs';
import { commands } from '#configs/config.mjs';

export default new MessageCommand({
  command: {
    name: 'setprefix',
    description: 'Đặt tiền tố cho bang hội này.',
    category: 'Utility',
    aliases: [],
  },
  options: {
    guildOwner: true,
    cooldown: 5000,
  },
  run: async (client, message, args) => {
    if (!args[0]) {
      await message.reply({
        content: 'Bạn phải cung cấp tiền tố!',
      });

      return;
    }

    if (args[0].length > 5) {
      await message.reply({
        content: 'Tiền tố quá dài! (' + args[0].length + ' > 5)',
      });

      return;
    }

    if (args[0] === commands.prefix) {
      client.database.guild.delete('prefix-' + message.guild.id);
    } else {
      client.database.guild.set('prefix-' + message.guild.id, args[0]);
    }

    await message.reply({
      content: 'Đã cập nhật thành công tiền tố thành \`' + args[0] + '\`.',
    });
  },
}).data;
