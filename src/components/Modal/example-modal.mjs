import { MessageFlags } from 'discord.js';

import Component from '#structure/Component.mjs';

export default new Component({
  customId: 'example-modal-id',
  type: 'modal',
  /**
   * @param {DiscordClient} client
   * @param {import('discord.js').ModalSubmitInteraction} interaction
   */
  run: async (client, interaction) => {
    const field = interaction.fields.getTextInputValue('example-modal-id-field-1');

    await interaction.reply({
      content: 'Hello **' + field + '**.',
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
