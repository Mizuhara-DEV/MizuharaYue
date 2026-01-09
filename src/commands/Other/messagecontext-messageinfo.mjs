import { MessageContextMenuCommandInteraction, MessageFlags } from 'discord.js';

import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'Message Information',
    type: 3,
  },
  options: {
    cooldown: 5000,
  },
  /**
   * @param {MessageContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const target = interaction.targetMessage;

    if (!target) {
      await interaction.reply({
        content: `Mục tiêu không hợp lệ!`,
      });

      return;
    }

    const array = [
      `**Author:** ${target.author.toString()}`,
      `**Content:** ${target.content}`,
      `**Has attachments?** ${target.attachments.size > 0 ? 'Yes' : 'No'}`,
    ];

    await interaction.reply({
      content: array.join('\n'),
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
