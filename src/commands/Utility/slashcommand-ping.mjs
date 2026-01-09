import { ChatInputCommandInteraction } from 'discord.js';

import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'ping',
    description: 'Trả lời với Pong!',
    type: 1,
    options: [],
  },
  options: {
    cooldown: 5000,
  },
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.reply({
      content: '**Pong!** ' + client.ws.ping + 'ms',
    });
  },
}).data;
