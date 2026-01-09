import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';

import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'eval',
    description: 'Thực thi mã JavaScript.',
    type: 1,
    options: [
      {
        name: 'code',
        description: 'Mã để thực thi.',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  options: {
    botOwner: true,
  },
  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.deferReply();

    const code = interaction.options.getString('code', true);

    try {
      let result = eval(code);

      if (typeof result !== 'string') result = require('util').inspect(result);

      result = `${result}`.replace(new RegExp(client.token, 'gi'), 'CLIENT_TOKEN'); // To avoid showing the client token to the public

      await interaction.editReply({
        content: 'Được, không có lỗi.',
        files: [
          new AttachmentBuilder(Buffer.from(`${result}`, 'utf-8'), {
            name: 'output.ts',
          }),
        ],
      });
    } catch (err) {
      await interaction.editReply({
        content: 'Đã xảy ra lỗi.',
        files: [
          new AttachmentBuilder(Buffer.from(`${err}`, 'utf-8'), {
            name: 'output.ts',
          }),
        ],
      });
    }
  },
}).data;
