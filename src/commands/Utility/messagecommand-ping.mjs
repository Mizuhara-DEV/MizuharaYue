import MessageCommand from '#structure/MessageCommand.mjs';

export default new MessageCommand({
  command: {
    name: 'ping',
    description: 'Trả lời với Pong!',
    category: 'Utility',
    aliases: ['p'],
    permissions: ['SendMessages'],
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, message, args) => {
    await message.reply({
      content: '**Pong!** ' + client.ws.ping + 'ms',
    });
  },
}).data;
