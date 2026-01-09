export default class MessageCommand {
  #data;

  /**
   * @param {{
   *  command: {
   *      name: string,
   *      description?: string,
   *      category?: string,
   *      aliases?: string[],
   *      permissions?: import('discord.js').PermissionResolvable[]
   *  },
   *  options?: Partial<{
   *      cooldown: number,
   *      botOwner: boolean,
   *      guildOwner: boolean,
   *      botDevelopers: boolean,
   *      nsfw: boolean
   *  }>,
   *  run: (client: DiscordClient, message: import('discord.js').Message, args: string[]) => import('discord.js').Awaitable<void> }} structure
   */
  constructor(structure) {
    // Kiểm tra dữ liệu bắt buộc
    if (!structure.command) {
      throw new Error("ApplicationCommand: Dữ liệu 'command' không được để trống.");
    }
    this.#data = {
      __type__: 2, // This used for the handler
      command: {
        description: '',
        category: '',
        aliases: [''],
        permissions: '',
        ...structure.command,
      },
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

  // Use getter to get data more safely
  get data() {
    return { ...this.#data };
  }

  /**
   * Reply và tự động xoá cả message người dùng & bot sau một khoảng thời gian
   * @param {import('discord.js').Message} message
   * @param {string} content
   * @param {number} timeout
   */
  static async replyAndDelete(message, content, timeout = 5000) {
    try {
      const reply = await message.reply(content);

      setTimeout(async () => {
        await reply.delete().catch(() => {});
        await message.delete().catch(() => {});
      }, timeout);
    } catch {
      // ignore error
    }
  }
}
