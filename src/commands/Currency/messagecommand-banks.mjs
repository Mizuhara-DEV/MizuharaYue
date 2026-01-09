import MessageCommand from '#structure/MessageCommand.mjs';

export default new MessageCommand({
	command: {
		name: 'bank',
		description: 'banks',
		aliases: ['bk'],
		category: 'Currency',
	},
	options: {
		cooldown: 5000,
	},

	async run(client, message, args) {
		const actionType = args[0]?.toLowerCase();
		switch (actionType) {
			case 'send':
				await message.reply({
					content: 'Kiểm tra lại và xác nhận thông tinh',
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									custom_id: 'confirm-button-id',
									label: 'Confirm',
									style: 1,
								},
							],
						},
					],
				});
				break;

			case 'withdraw':
				break;

			case 'pay':
				break;

			case 'borrow':
				break;

			default:
				return await reply();
		}

		async function reply() {
			await message.reply('actionType không hợp lệ!');
		}
	},
}).data;
