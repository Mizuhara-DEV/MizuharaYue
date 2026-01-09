import ApplicationCommand from '#structure/ApplicationCommand.mjs';

export default new ApplicationCommand({
  command: {
    name: 'components',
    description: '[LỆNH KIỂM TRA] Trả lời kèm theo ví dụ về các thành phần cần kiểm tra.',
    type: 1,
    options: [],
  },
  options: {
    botDevelopers: true,
  },
  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.reply({
      content: `Nhấp vào Nút và chọn một tùy chọn từ Menu Chọn bên dưới.`,
      components: [
        {
          type: 1,
          components: [
            {
              type: 2, // Button
              custom_id: `example-button:${interaction.user.id}`,
              label: 'Nút ví dụ',
              style: 1,
            },
          ],
        },
        {
          type: 1,
          components: [
            {
              type: 3, // String Select Menu
              custom_id: `example-menu:${interaction.user.id}`,
              placeholder: 'Bấm vào đây để chọn một tùy chọn',
              options: [
                { label: 'Chuối', value: 'option-banana' },
                { label: 'Quả cam', value: 'option-orange' },
                { label: 'Quả táo', value: 'option-apple' },
              ],
            },
          ],
        },
      ],
    });
  },
}).data;
