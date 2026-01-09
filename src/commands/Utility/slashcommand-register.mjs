import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';

import ApplicationCommand from '#structure/ApplicationCommand.mjs';
import { createAccount } from '#plugins/account-plugin.mjs';

export default new ApplicationCommand({
  command: {
    name: 'register',
    description: 'Tạo tài khoản người dùng cho hệ thống bot.',
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
    const discordUser = interaction.user;

    if (client.database.user.has(`acc.${discordUser.id}`)) {
      await interaction.reply({
        content: 'Bạn đã có tài khoản trong hệ thống!',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const isOk = await createAccount(client, discordUser);

    await interaction.reply({
      content: isOk ? 'Tạo tài khoản thành công!' : 'Tạo tài khoản thất bại!',
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
