import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'show-modal',
    description: '[LỆNH KIỂM TRA] Mở một phương thức.',
    type: 1,
    options: [],
  },
  options: { botDevelopers: true },
  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.showModal({
      custom_id: 'example-modal-id',
      title: 'Ví dụ về phương thức',
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: 'example-modal-id-field-1',
              label: 'Tên người dùng Discord của bạn là gì?',
              max_length: 15,
              min_length: 2,
              placeholder: 'Nhập tên người dùng của bạn vào đây!',
              style: 1,
              required: true,
            },
          ],
        },
      ],
    });
  },
}).data;
