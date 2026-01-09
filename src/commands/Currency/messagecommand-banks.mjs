import MessageCommand from '#structure/MessageCommand.mjs';
import BankManager from '#plugins/balance-service/bank-manager.mjs';

export default new MessageCommand({
  command: {
    name: 'bank',
    description: 'banks',
    category: 'Currency',
    aliases: ['bk'],
  },
  options: {
    cooldown: 5000,
  },

  async run(client, message, args) {
    const BM = new BankManager();

    const BUTTON_CONFIRM = {
      content: 'Kiểm tra lại và xác nhận thông tinh',
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              custom_id: `confirm-button:${message.author.id}`,
              label: 'Confirm',
              style: 1,
            },
          ],
        },
      ],
    };

    const actionType = args[0]?.toLowerCase();
    switch (actionType) {
      case 'rut':
        await message.reply(BUTTON_CONFIRM);
        break;

      case 'gui':
        await message.reply(BUTTON_CONFIRM);
        break;

      case 'vay':
        await message.reply(BUTTON_CONFIRM);
        break;

      case 'tra':
        await message.reply(BUTTON_CONFIRM);
        break;

      default:
        await message.reply({
          content: 'Chọn hành động của bạn.',
          components: [
            {
              type: 1,
              components: [
                {
                  type: 3,
                  custom_id: `menu-bank:${message.author.id}`,
                  placeholder: 'Bấm vào đây để chọn',
                  options: [
                    { label: 'Rút', value: 'bank-rut-tien' },
                    { label: 'Gui', value: 'bank-gui-tien' },
                    { label: 'Vay', value: 'bank-vay-tien' },
                    { label: 'Trả', value: 'bank-tra-tien' },
                  ],
                },
              ],
            },
          ],
        });
    }
  },
}).data;
