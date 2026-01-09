/**
 * @template {keyof ClientEvents} K
 */
export default class Event {
  #data;

  /**
   * @param {{
   *  event: K,
   *  once?: boolean,
   *  run: (client: DiscordClient, ...args: ClientEvents[K]) => import('discord.js').Awaitable<void> }} structure
   */
  constructor(structure) {
    this.#data = {
      __type__: 5, // This used for the handler
      ...structure,
    };
  }

  // Use getter to get data more safely
  get data() {
    return { ...this.#data };
  }
}
