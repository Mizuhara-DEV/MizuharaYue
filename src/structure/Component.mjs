export default class Component {
  #data;

  /**
   * @param {{
   *  	customId: string,
   *  	type: 'modal' | 'select' | 'button',
   *  	options?: { public?: boolean },
   *  	run: (
   * 			client: DiscordClient,
   * 			interaction: ButtonInteraction | AnySelectMenuInteraction | AutocompleteInteraction | ModalSubmitInteraction
   *  	) => import('discord.js').Awaitable<void>
   *  }} structure
   */
  constructor(structure) {
    // Kiểm tra dữ liệu bắt buộc
    if (!structure.customId) {
      throw new Error("Component: 'customId' không được để trống.");
    }
    // Đảm bảo các giá trị mặc định luôn tồn tại
    this.#data = {
      __type__: 3, // Định danh cho Component Handler
      options: { public: true, ...structure.options },
      ...structure,
    };
  }

  // Use getter to get data more safely
  get data() {
    return { ...this.#data };
  }
}
