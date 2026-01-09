import { MessageFlags } from 'discord.js';

import Component from '#structure/Component.mjs';

export default new Component({
  customId: 'example-menu',
  type: 'select',
  /**
   *
   * @param {DiscordClient} client
   * @param {import('discord.js').AnySelectMenuInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.reply({
      content: 'Đã trả lời từ tương tác Chọn Menu! (Bạn đã chọn **' + interaction.values[0] + '**).',
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
