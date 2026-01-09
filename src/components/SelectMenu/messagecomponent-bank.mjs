import Component from '#structure/Component.mjs';
import { MessageFlags } from 'discord.js';

export default new Component({
  customId: 'menu-bank',
  type: 'select',
  options: {
    public: false,
  },

  /** @param {AnySelectMenuInteraction} interaction */
  async run(client, interaction) {
    await interaction.reply({
      content: `Đã trả lời từ tương tác Chọn Menu! (Bạn đã chọn **${interaction.values[0]}**).`,
      flags: 64,
    });
  },
}).data;
