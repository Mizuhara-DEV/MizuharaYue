/**
 * @template {keyof import('discord.js').ClientEvents} K
 */
export default class Event {
	#data;

	/**
	 * @param {{
	 *  event: K,
	 *  once?: boolean,
	 *  run: (client: DiscordClient, ...args: import('discord.js').ClientEvents[K]) => import('discord.js').Awaitable<void> }} structure
	 */
	constructor(structure) {
		this.#data = {
			__type__: 5, // This used for the handler
			...structure,
		};
	}

	// Sử dụng getter để lấy data an toàn hơn
	get data() {
		return { ...this.#data };
	}
}
