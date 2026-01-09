import { MessageFlags } from 'discord.js';

import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'User Information',
    type: 2,
  },
  options: {
    cooldown: 5000,
  },
  /**
   * @param {import('discord.js').UserContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const target = interaction.targetMember;

    if (!target) {
      await interaction.reply({
        content: `Mục tiêu không hợp lệ!`,
      });
      return;
    }

    const array = [
      `**Displayname:** ${target.user.username}`,
      `**Bot?** ${target.user.bot ? 'Yes' : 'No'}`,
      `**Guild Owner?** ${target.user.id == interaction.guild.ownerId ? 'Yes' : 'No'}`,
    ];

    await interaction.reply({
      content: array.join('\n'),
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
