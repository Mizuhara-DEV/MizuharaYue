import MessageCommand from '#structure/MessageCommand.mjs';

export default new MessageCommand({
  command: {
    name: 'shutdown',
    description: 'shutdown bot',
    category: 'Developer',
    aliases: ['sdb'],
  },
  options: {
    botDevelopers: true,
    botOwner: true,
  },

  async run(client, message, args) {
    await client.shutdown();
  },
}).data;
