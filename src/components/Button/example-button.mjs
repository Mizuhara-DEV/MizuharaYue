import { MessageFlags } from 'discord.js';

import Component from '#structure/Component.mjs';

export default new Component({
  customId: 'example-button',
  type: 'button',
  options: {
    public: false,
  },
  /**
   * @param {ButtonInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.reply({
      content: 'Đã trả lời từ tương tác Nút!',
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
