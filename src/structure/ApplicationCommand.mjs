export default class ApplicationCommand {
  #data;

  /**
   * @param {{
   *  command: Partial<APIApplicationCommand>,
   *  options?: Partial<{
   *      cooldown?: number,
   *      botOwner?: boolean,
   *      guildOwner?: boolean,
   *      botDevelopers?: boolean
   *  }>,
   *  run: (client: DiscordClient, interaction: Interaction) => import('discord.js').Awaitable<void>
   * }} structure
   */
  constructor(structure) {
    // Kiểm tra dữ liệu bắt buộc
    if (!structure.command) {
      throw new Error("ApplicationCommand: Dữ liệu 'command' không được để trống.");
    }

    this.#data = {
      __type__: 1, // Identifier cho Application Command Handler
      options: {
        cooldown: 0,
        botOwner: false,
        guildOwner: false,
        botDevelopers: false,
        ...structure.options,
      },
      ...structure,
    };
  }

  // Sử dụng getter để lấy data an toàn hơn
  get data() {
    return { ...this.#data };
  }
}
