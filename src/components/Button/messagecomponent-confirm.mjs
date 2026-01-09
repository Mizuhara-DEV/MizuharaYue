import Component from '#structure/Component.mjs';
import { MessageFlags } from 'discord.js';

export default new Component({
  customId: 'confirm-button',
  type: 'button',
  options: {
    public: false,
  },

  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async run(client, interaction) {
    await interaction.reply({
      content: 'Đã trả lời từ tương tác Nút confirm!',
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
