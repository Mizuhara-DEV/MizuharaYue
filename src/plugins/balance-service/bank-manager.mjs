import { Message } from 'discord.js';
import CurrencyService from './currency-service.mjs';

export default class BankManager {
  #userData;

  /**
   * @param {DiscordClient} client
   * @param {Message} message
   */
  constructor(client, message) {
    this.#userData = {
      id: message.author.id,
      name: message.author.displayName,
    };
  }
}
