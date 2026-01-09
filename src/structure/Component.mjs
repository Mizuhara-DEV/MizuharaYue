export default class Component {
	#data;

	/**
	 * @param {{
	 *  customId: string,
	 *  type: 'modal' | 'select' | 'button',
	 *  options?: { public?: boolean },
	 *  run: (client: DiscordClient, interaction: import('discord.js').ButtonInteraction | import('discord.js').AnySelectMenuInteraction | import('discord.js').AutocompleteInteraction | import('discord.js').ModalSubmitInteraction) => import('discord.js').Awaitable<void>
	 * }} structure
	 */
	constructor(structure) {
		// Kiểm tra dữ liệu bắt buộc
		if (!structure.customId) {
			throw new Error("ApplicationCommand: Dữ liệu 'command' không được để trống.");
		}
		// Đảm bảo các giá trị mặc định luôn tồn tại
		this.#data = {
			__type__: 3, // Định danh cho Component Handler
			options: { public: true, ...structure.options },
			...structure,
		};
	}

	// Sử dụng getter để lấy data an toàn hơn
	get data() {
		return { ...this.#data };
	}
}
