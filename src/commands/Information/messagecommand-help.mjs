import MessageCommand from '#structure/MessageCommand.mjs';
import { commands } from '#configs/config.mjs';

export default new MessageCommand({
  command: {
    name: 'help',
    description: 'Trả lời bằng danh sách các lệnh tin nhắn có sẵn.',
    category: 'Information',
    aliases: ['h'],
  },
  options: {
    cooldown: 10000,
  },
  run: async (client, message, args) => {
    await message.reply({
      content: `${client.collection.message_commands.map((cmd) => '\`' + client.database.guild.ensure('prefix-' + message.guild.id, commands.prefix) + cmd.command.name + '\`').join(', ')}`,
    });
  },
}).data;
