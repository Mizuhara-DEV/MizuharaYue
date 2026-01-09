export default class AutocompleteComponent {
  #data;

  /**
   * @param {{
   *  commandName: string,
   *  run: (client: DiscordClient, interaction: import('discord.js').AutocompleteInteraction) => import('discord.js').Awaitable<void>
   * }} structure
   */
  constructor(structure) {
    // Kiểm tra xem có commandName không để tránh lỗi logic sau này
    if (!structure.commandName) {
      throw new Error('AutocompleteComponent: commandName là bắt buộc.');
    }

    this.#data = {
      __type__: 4, // Định danh cho Autocomplete Handler
      ...structure,
    };
  }

  // Sử dụng getter để lấy data an toàn hơn
  get data() {
    return { ...this.#data };
  }
}
