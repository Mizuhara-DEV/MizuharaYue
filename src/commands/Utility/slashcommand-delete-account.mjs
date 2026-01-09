import { MessageFlags } from 'discord.js';

import { deleteAccount } from '#plugins/account-plugin.mjs';
import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'delete-account',
    description: 'Xóa tài khoản người dùng khỏi cơ sở dữ liệu.',
    type: 1,
    options: [],
  },
  options: {
    guildOwner: true,
    botDevelopers: true,
  },
  /** @param {import('discord.js').ChatInputCommandInteraction} interaction */
  run: async (client, interaction) => {
    const discordUser = interaction.user;

    const isOk = await deleteAccount(client, discordUser);

    await interaction.reply({
      content: isOk
        ? 'Tài khoản của bạn đã được xóa thành công khỏi cơ sở dữ liệu.'
        : 'Bạn không có tài khoản nào trong cơ sở dữ liệu.',
      flags: MessageFlags.Ephemeral,
    });
  },
}).data;
