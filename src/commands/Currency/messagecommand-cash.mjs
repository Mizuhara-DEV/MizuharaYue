import { EmbedBuilder } from 'discord.js';

import MessageCommand from '#structure/MessageCommand.mjs';
import { getAccount } from '#plugins/account-plugin.mjs';

export default new MessageCommand({
	command: {
		name: 'cash',
		description: 'Trả lời với số tiền hiện có trong ví của bạn.',
		category: 'Information',
		aliases: ['balance', 'money'],
	},
	options: {
		cooldown: 5000,
	},
	run: async (client, message, args) => {
		const discordUser = message.member ? message.member : message.author;
		const account = await getAccount(client, discordUser);

		if (!account) {
			return await MessageCommand.replyAndDelete(
				message,
				'Bạn chưa có tài khoản. Sử dụng lệnh `/register` để tạo tài khoản.',
				7000
			);
		}

		const central = client.bot.centralService.getCentral;
		const embed = new EmbedBuilder()
			.setColor('#fab1a0')
			.setTitle(`📋 Thông Tin Tài Khoản: ${message.author.displayName}`)
			.setThumbnail(message.author.displayAvatarURL())
			.addFields(
				{
					name: '💸 Ví tiền',
					value: `**${account.assets.cash.toLocaleString('vi-VN')} VND**`,
					inline: true,
				},
				{
					name: '🏦 Ngân hàng',
					value: `**${account.bank.bankBalance.toLocaleString('vi-VN')} VND**`,
					inline: true,
				},
				{
					name: '💵 Lãi / giờ',
					value: `**${Math.floor(account.bank.bankBalance * central.bankInterestRate).toLocaleString('vi-VN')} VND**`,
					inline: true,
				},
				{
					name: '📉 Lãi vay / giờ',
					value: `**${Math.floor(account.bank.loanAmount * central.loanInterestRate).toLocaleString('vi-VN')} VND**`,
					inline: true,
				},
				{
					name: '💳 Đang vay',
					value: `**${account.bank.loanAmount.toLocaleString('vi-VN')} VND**`,
					inline: true,
				},
				{
					name: '🧾 Lãi chưa trả',
					value: `**${account.bank.loanInterestAccrued.toLocaleString('vi-VN')} VND**`,
					inline: true,
				},
				{
					name: '⚠️ Phạt',
					value: `**${account.bank.penaltyAmount.toLocaleString('vi-VN')} VND**`,
					inline: true,
				},
				{
					name: '📅 Lần tích lãi cuối',
					value: account.bank.lastBankActionAt
						? `<t:${Math.floor(account.bank.lastBankActionAt / 1000)}:R>`
						: 'Chưa từng tích lãi',
					inline: true,
				},
				{
					name: '💰 Quyền Được Vay',
					value: account.bank.canBorrow ? '✅ Có thể' : '❌ Không thể',
					inline: true,
				}
			)
			.setFooter({ text: '📊 Thông tin tài chính cá nhân' })
			.setTimestamp();

		await message.reply({ embeds: [embed] });
	},
}).data;
